const { db } = require('../utils/admin');
const config = require("../utils/config");
const { v4: uuidv4 } = require('uuid');
const firebase = require("firebase");

//firebase.initializeApp(config);

//get questions
exports.getQuestions=(req,res)=>{
    db.collection('questions')
      .orderBy('postedAt', 'desc')
      .get()
      .then((data) => {
        let questions = [];
        data.forEach((doc) => {
          questions.push({
            questionId: doc.id,
            title:doc.data().title,
            question: doc.data().question,
            userName: doc.data().userName,
            postedAt: doc.data().postedAt,
            commentCount: doc.data().commentCount,
            likeCount: doc.data().likeCount,
            imageUrl:doc.data().imageUrl,
          });
        });
        return res.json(questions);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
};

//post question
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  projectId: config.projectId,
  keyFilename: "./key/privateKey.json"
});
const bucket = storage.bucket(config.storageBucket);

exports.askQuestion=(req,res)=>{
    if (req.body.question.trim() === '') {
      return res.status(400).json({ body: 'question must not be empty' });
    }

    const path = require("path");
    const os = require("os");
    const fs = require("fs");
    let generatedToken = uuidv4();
    let imageToBeUploaded = {};
    const imageFile=req.file;
    console.log(imageFile)
    const imageExtension = imageFile.originalname.split(".")[imageFile.originalname.split(".").length - 1];
    let imageFileName = `${Math.round(
      Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
    let filepath=path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype:imageFile.mimetype };

    const uploadImageToStorage = () => {
      return new Promise((resolve, reject) => {
        if (!imageToBeUploaded) {
          reject('No image file');
        }    
        let fileUpload = bucket.file(imageFileName);
    
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: imageFile.mimetype,
            firebaseStorageDownloadTokens:generatedToken
          }
        });
    
        blobStream.on('error', (error) => {
          reject('Something is wrong! Unable to upload at the moment.');
        });
    
        blobStream.on('finish', () => {
          // The public URL can be used to directly access the file via HTTP.
          const url = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
          resolve(url);
        });
    
        blobStream.end(imageFile.buffer);
      });
    }

  if (imageFile) {
    var imageUrl;
    uploadImageToStorage()
    .then(() => {
      // Append token to url
      var imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
      return imageUrl;
    })
    .then((snapshot)=>{
      const newquestion={
        userName: req.user.userName,
        title:req.body.title,
        question:req.body.question,
        postedAt: new Date().toISOString(),
        imageUrl:snapshot,
        likeCount:0,
        commentCount:0
      };
  
    db.collection('questions')
      .add(newquestion)
      .then((doc) => {
        const resQuestion = newquestion;
        resQuestion.questionId = doc.id;
        res.json(resQuestion);
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
        console.error(err);
      });
    })
    .catch(()=>{
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    })
  }
};

//fetch one Question
exports.fetchQuestion=(req, res) => {
    let questionData = {};
    console.log("Inside Fetch question",req.params);
    db.doc(`/questions/${req.params.questionId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("Question does not exists")
          return res.status(404).json({ error: 'Question not found' });
        }
        questionData = doc.data();
        questionData.questionId = doc.id;
        return db
          .collection('comments')
          .orderBy('postedAt', 'desc')
          .where('questionId', '==', req.params.questionId)
          .get();
      })
      .then((data) => {
        questionData.comments = [];
        data.forEach((doc) => {
          questionData.comments.push(doc.data());
        });
        return res.json(questionData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
};

//delete a question

exports.deleteQuestion=(req,res)=>{
  console.log("Inside delete",req.params);
  const document = db.doc(`/questions/${req.params.questionId}`);
  document.
  get()
  .then((doc)=>{
    if(!doc.exists)
    {
      res.status(404).json({error:"Question not found"});
    }
    if (doc.data().userName !== req.user.userName) {
      return res.status(403).json({ error: 'Unauthorized' });
    } else {
      return document.delete();
    }
  })
  .then(()=>{
    res.json({ message: 'Question deleted successfully' });
  })
  .catch((err)=>{
    console.error(err);
    return res.status(500).json({ error: err.code });
  })
}

//Comment on question
exports.commentOnQuestion=(req,res)=>{
  console.log("Comments api called")
  if (req.body.body.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });

  const newComment = {
    body: req.body.body,
    postedAt: new Date().toISOString(),
    questionId: req.params.questionId,
    userName: req.user.userName,
  };
  console.log(newComment);

  db.doc(`/questions/${req.params.questionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Question not found' });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
}