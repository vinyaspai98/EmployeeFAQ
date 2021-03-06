import React, { useState, useEffect,Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import { render } from 'node-sass';

const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    alignItems: 'center',
  },
  grid: {
    height: '100%',
    alignItems: 'center',
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  }
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading:false,
      errors: {}
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };
  handleSignIn = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password
    };
     axios
    .post('/login', newUserData)
    .then((res) => {
      this.setAuthorizationHeader(res.data.token);
      this.setState(
        {
          loading:false
        }
      )
      this.props.history.push('/');
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          errors:err.response.data,
          loading:false
        }
      )
    });
  };
  render(){
  const {
    classes,
    history,
  } = this.props;
  const { errors } = this.state;
  return (
    <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src='/images/logos/icon-black.png' alt="Logo" className={classes.logoImage} />
          <Typography variant="h2" className={classes.title}>
            Login
          </Typography>
            <form noValidate onSubmit={this.handleSignIn}>
          <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.signUpButton}
              disabled={this.state.loading}
            >
              SignIn
              {this.state.loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account? {' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
          </form>
          </Grid>
          <Grid item sm />
          </Grid>
  );
  }
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default withStyles(useStyles)(SignUp);
