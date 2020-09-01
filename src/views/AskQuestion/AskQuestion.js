import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

class AskQuestion extends Component {
  constructor() {
    super();
    this.state = {
      title:'',
      question:'',
      image:null,
      statusText:null,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onChangeFile=(event)=> {
    event.stopPropagation();
    event.preventDefault();
    this.state.image=event.target.files[0];
    console.log(this.state.image)
}

  handleAskQuestion=()=> {
    const newQuestion={
      "title":this.state.title,
      "question":this.state.question
    }
    axios
    .post('/askquestion', newQuestion)
    .then((res) => {
      console.log(res)
      this.setState(
        {
          statusText:"Question Posted Successfully"
        }
      )
      this.props.history.push('/questions');
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          statusText:"Error while posting question"
        }
        )
    });
    console.log(this.state.statusText)
  }

  render(){
  const { classes,history } = this.props;
  return (
    <Grid container className={classes.form}>
        <Grid item sm>
          <Typography variant="h2" className={classes.title}>
            Ask Question
          </Typography>
            <form noValidate>
          <TextField
              name="title"
              type="text"
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              name="question"
              type="text"
              label="body"
              multiline
              rows={6}
              className={classes.textField}
              value={this.state.question}
              onChange={this.handleChange}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              name="image"
              type="file"
              required
              className={classes.textField}
              value={this.state.body}
              onChange={this.onChangeFile}
              fullWidth
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.signUpButton}
              onClick={this.handleAskQuestion}
            >
              Post Question
            </Button>
              {this.state.statusText && (
                <Typography variant="body2" className={classes.customError}>
                  {this.state.statusText}
                </Typography>
              )}
            <br />
          </form>
          </Grid>
          </Grid>
  );
  }
};

AskQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(AskQuestion);
