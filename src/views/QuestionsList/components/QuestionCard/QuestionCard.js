import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import PropTypes from 'prop-types';
import CommentsCard from '../CommentsCard'

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  media: {
    height: "500px",
    width:"500px",
    paddingTop: '50.25%', // 16:9
    alignItems: 'center',
    justifyContent: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const QuestionCard = props => { 
    const { className, question, ...rest } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(question)

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {question.userName[0].toUpperCase()}
          </Avatar>
        }
        
        title={question.userName}
        subheader={moment(question.postedAt).fromNow()}
      />
      {question.imageUrl && <CardMedia
        className={classes.media}
        image={question.imageUrl}
        title="image"
      />}
      <CardContent>
      <Typography variant="h4" gutterBottom color="primary" component="h2">
          {question.title}
        </Typography>
        <Typography variant="h6" component="p">
          {question.question}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentsCard questionId={question.questionId} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

QuestionCard.propTypes = {
    className: PropTypes.string,
    question: PropTypes.object.isRequired
  };
  
export default QuestionCard;