import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Card, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import moment from 'moment';

const useStyles = theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  customizeToolbar: {
    maxHeight: '5px'
  }
});

class Topbar  extends Component{
  constructor() {
    super();
    this.state = {
      expanded:false,
      notifications:[]
    };
  }
  componentDidMount=()=>{
    axios.get('/notifications/user')
    .then((res)=>{
      console.log(res)
      this.setState({
        notifications:res.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  handleExpandClick = () => {
    this.setState({
      expanded:!this.state.expanded
    })
  };
  render(){
  const { classes, onSidebarOpen, ...rest } = this.props;

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, classes)}
    >
      <Toolbar className={classes.customizeToolbar}>
        <RouterLink to="/" >
          <img
            alt="Logo"
            src="/images/logos/icon.png" width="160px" height="50px"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton className={clsx(classes.expand, {
            [classes.expandOpen]: this.state.expanded,
          })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
          color="inherit">
            <Badge
              badgeContent={this.state.notifications.length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit collapsedHeight='15px'>
        <CardContent>
          <Card className={classes.root} variant="outlined">
            {this.state.notifications.map(data => (
              <Grid key={data.postedAt}>
            <CardContent>
            <Typography>{data.sender} commented on your question {moment(data.postedAt).fromNow()}</Typography>
            </CardContent>
            </Grid>
            ))}
          </Card>
        </CardContent>
      </Collapse>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )};
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default withStyles(useStyles)(Topbar);
