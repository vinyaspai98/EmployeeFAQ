import React,{Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
});

class AccountProfile extends Component {
  constructor() {
    super();
    this.state = {
      image:null,
      statusText:null,
      userData:{}
    };
  }
  onChangeFile=(event)=> {
    event.stopPropagation();
    event.preventDefault();
    // this.setState({image:event.target.files[0]},()=>{
    //   console.log(this.state);
    // }); 
    this.state.image=event.target.files[0];
    console.log(this.state.image)
    if(this.state.image)
      this.handleUpload();
}

   handleUpload=()=>{
     console.log("image ",this.state.image)
     const formData =new FormData();
     formData.append('image',this.state.image,this.state.image.name)
    axios
    .post('/user/image', formData)
    .then((res) => {
      console.log(res)
      this.state.userData.imageUrl=res.data.imageUrl
      this.setState(
        {
          statusText:"Profile Photo Uploaded Successfully"
        }
      )
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          statusText:"Error while uploading the profile photo"
        }
        )
        console.log(this.state.statusText);
    });
  }
  handleRemovePhoto=()=>{
    axios
    .get('/user/removeImage')
    .then((res) => {
      this.state.userData.imageUrl=res.data.imageUrl
      this.setState(
        {
          statusText:"Profile Photo Deleted Successfully"
        }
      )
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          statusText:"Error while Deleting the profile photo"
        }
        )
    });
  }
  componentDidMount() {
    axios
      .get(`/user`)
      .then((res) => {
        this.setState({
          userData: res.data
        });
      })
      .catch((err) => console.log(err));
  }
  render(){
    const { classes, ...rest } = this.props;
  return (
    <Card
      {...rest}
      className={clsx(classes.root, classes)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {this.state.userData.fullName ? this.state.userData.fullName : this.state.userData.userName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {this.state.userData.location}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={this.state.userData.imageUrl}
          />
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
      <input id="myInput"
        type="file"
        ref={(ref) => this.upload = ref}
        style={{display: 'none'}}
        onChange={this.onChangeFile}
      />
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={()=>{this.upload.click()}}
        >Change picture</Button>
        <Button variant="text" onClick={this.handleRemovePhoto}>Remove picture</Button>
      </CardActions>
      {this.state.statusText && (
        <Typography variant="body2" className={classes.customError}>
          {this.state.statusText}
        </Typography>
      )}
    </Card>
  );
  }
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default withStyles(useStyles)(AccountProfile);
