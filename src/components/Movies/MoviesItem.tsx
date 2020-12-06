import React, { useState } from 'react';
import classNames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 350,
  },
  rateContainer: {
    fontSize: 20,
    paddingTop: 5
  },
  dialogImg: {
    height: 400
  }
});

export default function MoviesItem({movie}: any) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rateClasses = classNames({
    'rate-high': movie.vote_average >= 7,
    'rate-medium': movie.vote_average < 7 && movie.vote_average > 3,
    'rate-low': movie.vote_average <= 3,
  })

  return (
    <>
      <Card className={classes.root} onClick={handleOpen}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              <div className="movie-title">
                {movie.title}
              </div>
            </Typography>

            <h3>
              <Grid container>
                <Grid item className={rateClasses}>{movie.vote_average}</Grid>
                  <Grid item className={rateClasses}>
                  <StarRateIcon fontSize="inherit"/>
                </Grid>
              </Grid>
            </h3>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{movie.title}</DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <img className={classes.dialogImg} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
          </Grid>

          <h4>
            <Grid container>
              <Grid item xs={1}>
                Rate:
              </Grid>
              <Grid item className={rateClasses}>{movie.vote_average}</Grid>
              <Grid item className={rateClasses}>
                <StarRateIcon fontSize="inherit"/>
              </Grid>
            </Grid>
          </h4>
          
          <h4>Overview:</h4>
          <DialogContentText>
            {movie.overview}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
