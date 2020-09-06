const app = require('express')()
var bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));
const Multer = require('multer'); 
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  },
});

const {
    signup,
    login,
    uploadImage,
    getAuthenticatedUser,
    updateProfile,
    removeImage,
    getUserName
  } = require('./handlers/users');

const{
    getQuestions,
    askQuestion,
    fetchQuestion,
    deleteQuestion,
    commentOnQuestion
}= require('./handlers/questions');

const {
  createNotificationOnComment,
  getNotifications
}=require('./handlers/notifications')


const fbAuth = require('./utils/fbAuth')

app.post('/signup',signup);
app.post('/login',login);
app.get('/user', fbAuth, getAuthenticatedUser);
app.post('/user/updateProfile',fbAuth,updateProfile)
app.post('/user/image',fbAuth,multer.single('image'),uploadImage);
app.get('/user/removeImage',fbAuth,removeImage)
app.get('/getusername',fbAuth,getUserName)

app.get('/questions',getQuestions);
app.post('/askquestion',fbAuth,multer.single('image'),askQuestion);
app.get('/question/:questionId',fbAuth,fetchQuestion);
app.delete('/question/:questionId', fbAuth, deleteQuestion);
app.post('/question/:questionId/comment', fbAuth, commentOnQuestion);

app.get('/comment/notification/:questionId',fbAuth,createNotificationOnComment);
app.get('/notifications/user',fbAuth,getNotifications);

//start server
app.listen(5000,()=>{
  console.log("Server is running in 5000");
})
.on('error',console.log);
