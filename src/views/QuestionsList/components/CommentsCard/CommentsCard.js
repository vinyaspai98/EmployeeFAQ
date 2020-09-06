import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import axios from 'axios';

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  CardHeader
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
  PostButton: {
    margin: theme.spacing(2),
  }
});

class CommentsCard extends Component {
  constructor() {
    super();
    this.state = {
        userComments:[],
        commentBody:'',
        statusText:null,
    };
  }

  componentDidMount = async()=>
  {
      console.log("Inside",this.props.questionId)
      await axios.get(`/question/${this.props.questionId}`)
      .then((res)=>{
          console.log(res)
          this.setState(
            {
                userComments:res.data.comments,
            }
            )
      })
      .catch((err)=>{
        console.log(err.response);
      })
      console.log(this.state.userComments)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePostComment=()=> {
    const commentnData={
      "body":this.state.comment
    }
    axios
    .post(`/question/${this.props.questionId}/comment`, commentnData)
    .then((res) => {
      console.log(res)
      this.setState(
        {
          statusText:"Comment Posted Successfully"
        }
      )
      this.state.comment="";
    })
    .catch((err) => {
      console.log(err.response);
      this.setState(
        {
          statusText:"Error while posting Comment"
        }
        )
    });
    console.log(this.state.statusText)

    //Creating comment notification
    axios
    .get(`/comment/notification/${this.props.questionId}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  render(){
  const { classes,questionId } = this.props;
  return (
    <Card className={classes.root} variant="outlined">
    {this.state.userComments.map( comment =>(
        <Grid 
            key={comment.body}        
        >
      <CardContent>
        <Link><Typography variant="body2" component="a" color="primary" gutterBottom>
          {comment.userName}
        </Typography></Link>
        <Typography variant="body2" component="p" color="textSecondary">
          {moment(comment.postedAt).fromNow()}
        </Typography>
        <br></br>
        <Typography variant="body1" component="p">
          {comment.body}
          <br />
        </Typography>
      </CardContent>
      </Grid>
      ))
    }
      <CardActions className={classes.root}  >
            <TextField
              name="comment"
              type="text"
              label="commemt here"
              className={classes.textField}
              value={this.state.comment}
              onChange={this.handleChange}
              fullWidth
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.PostButton}
              onClick={this.handlePostComment}
            >
              Post
            </Button>
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

CommentsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(CommentsCard);
