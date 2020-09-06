const { db } = require('../utils/admin');
const config = require("../utils/config");
const firebase = require("firebase");
const { getDefaultLibFilePath } = require('typescript');

//create Notification on comment
exports.createNotificationOnComment = (req,res)=>{
    console.log("Notifications api called")
    const questionId=req.params.questionId;
    db.doc(`/questions/${questionId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("Question does not exists")
          return res.status(404).json({ error: 'Question not found' });
        }
        return doc.data().userName;
    })
    .then((userName)=>{

      const newNotification = {
      postedAt: new Date().toISOString(),
      questionId: questionId,
      read:false,
      sender: req.user.userName,
      recipient:userName
    };
    console.log(newNotification);
    db.collection('notifications')
      .add(newNotification)
      .then((doc) => {
        const resNotification = newNotification;
        resNotification.notificationId = doc.id;
        res.json(resNotification);
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
        console.error(err);
      });
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' });
    })
}

//get Notifications
exports.getNotifications=(req,res)=>{
    notifications=[]
    console.log("Get Notifications")
    db.collection('/notifications')
    .where('recipient','==',req.user.userName)
    .where('read','==',false)
    .get()
    .then((snapshot)=>{
        snapshot.forEach((doc) => {
            notifications.push(doc.data());})
        console.log(notifications)
        res.json(notifications)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:"Something went wrong"})
    })
}