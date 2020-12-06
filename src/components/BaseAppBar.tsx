import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  })
);



export default function BaseAppBar() {
  const classes = useStyles();

  const openLink = () => {
    window.open('https://github.com/ichbinkour/canal-plus-movies', "_blank") //to open new page
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Movies List
          </Typography>
          <IconButton color="inherit" aria-label="upload picture" component="span" onClick={openLink}>
            <GitHubIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
