import React,{Component} from 'react';
import { Grid } from '@material-ui/core';
import QuestionCard from '../QuestionsList/components/QuestionCard'
import { withStyles } from '@material-ui/core/styles';
import { AccountProfile, AccountDetails } from './components';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { forEach } from 'underscore';

const useStyles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  Title :{
    marginTop: theme.spacing(5),
    marginBottom:theme.spacing(3),
  }
});

class Account extends Component {
  constructor() {
    super();
    this.state = {
      questions:[]
    };
  }
componentDidMount = async()=>{
  let userName="";
  let allQuestions=[];
  let userQuestions=[];
  await axios
      .get(`/getusername`)
      .then((res) => {
        userName= res.data.userName;
      })
      .catch((err) => console.log(err));
  await axios
      .get(`/questions`)
      .then((res) => {
          allQuestions = res.data;
      })
      .catch((err) => console.log(err));

      allQuestions.forEach(que=>{
        if(que.userName===userName)
        {
          userQuestions.push(que)
        }
      });
      this.setState({
        questions:userQuestions
      })
}
render(){
  const { classes } = this.props;
  console.log(this.state.questions)
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
      {this.state.questions.length ? (<Typography variant="h4" component="h4" color="primary" className={classes.Title}>
          Asked Questions
        </Typography>):""}
      {this.state.questions.map(que => (
            <Grid
              item
              key={que.questionId}
              xs={12}
            >
              <QuestionCard question={que} settingsButton={true} />
            </Grid>
          ))}
    </div>
  )};
};

export default withStyles(useStyles)(Account);
