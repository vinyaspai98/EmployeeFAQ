import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = (() => ({
  root: {}
}));

class AccountDetails extends Component {
  constructor() {
    super();
    this.state = {
      userName:null,
      fullName:null,
      email:null,
      phoneNumber:null,
      location:null,
      bio:null,
      statusText: null
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    axios
      .get(`/user`)
      .then((res) => {
        this.setState({
          userName:res.data.userName,
          fullName:res.data.fullName,
          email:res.data.email,
          phoneNumber:res.data.phoneNumber,
          location:res.data.location,
          bio:res.data.bio
        });
      })
      .catch((err) => console.log(err));
  }
  
  handleUpdateProfile=()=>{
    console.log(this.state.phoneNumber)
    var userData={
      "fullName":this.state.fullName,
      "userName":this.state.userName,
      "email":this.state.email,
      "phoneNumber":this.state.phoneNumber,
      "location":this.state.location,
      "bio":this.state.bio
    }
    axios
    .post('/user/updateProfile',userData)
    .then((res) => {
      console.log(res)
      this.setState(
        {
          statusText:"Profile Uploaded Successfully!!"
        }
      )
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          statusText:"Error while uploading the profile!!"
        }
        )
    });
  }
  render()
  {
    const { classes, ...rest } = this.props;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, classes)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the Full name"
                label="Full name"
                margin="dense"
                name="fullName"
                onChange={this.handleChange}
                defaultValue={this.state.fullName}
                key={this.state.fullName ? 'notLoadedYet' : 'loaded'}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="userName"
                margin="dense"
                name="userName"
                disabled
                onChange={this.handleChange}
                value={this.state.userName ? this.state.userName : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                disabled
                onChange={this.handleChange}
                value={this.state.email ? this.state.email : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phoneNumber"
                defaultValue={this.state.phoneNumber}
                key={this.state.phoneNumber ? 'notLoadedYet' : 'loaded'}
                onChange={this.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Bio"
                margin="dense"
                name="bio"
                key={this.state.bio ? 'notLoadedYet' : 'loaded'}
                onChange={this.handleChange}
                defaultValue={this.state.bio}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Location"
                margin="dense"
                name="location"
                defaultValue={this.state.location}
                key={this.state.location ? 'notLoadedYet' : 'loaded'}
                onChange={this.handleChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleUpdateProfile}
          >
            Save details
          </Button>
        </CardActions>
      </form>
      {this.state.statusText && (
        <Typography variant="body2" className={classes.customError}>
          {this.state.statusText}
        </Typography>
      )}
    </Card>
  );
}};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default withStyles(useStyles)(AccountDetails);
