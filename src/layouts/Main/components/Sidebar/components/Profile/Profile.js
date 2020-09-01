import React,{Component} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
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

  const { classes} = this.props;
  const user = {
    name: this.state.userData.fullName ? this.state.userData.fullName : this.state.userData.userName,
    avatar: this.state.userData.imageUrl,
    location: this.state.userData.location ? this.state.userData.location : ""
  };

  return (
    <div
      className={clsx(classes.root, classes)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.location}</Typography>
    </div>
  );
}};

Profile.propTypes = {
  className: PropTypes.string
};

export default withStyles(useStyles)(Profile);
