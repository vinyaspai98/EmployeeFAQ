import React, { useState,Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { QuestionsToolbar, QuestionCard } from './components';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class QuestionList extends Component {
  questions={}
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  componentDidMount() {
    axios
      .get(`/questions`)
      .then((res) => {
        this.setState({
          questions: res.data
        });
      })
      .catch((err) => console.log(err));
  }
  render(){
  const {classes}=this.props;

  return (
    
    <div className={classes.root}>
      <QuestionsToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {this.state.questions.map(que => (
            <Grid
              item
              key={que.questionId}
              xs={12}
            >
              <QuestionCard question={que} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
};

export default withStyles(useStyles)(QuestionList);
