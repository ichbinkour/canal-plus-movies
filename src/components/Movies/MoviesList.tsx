import React, { useEffect, useState } from 'react';
import { getMovieList } from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component';

import MoviesItem from './MoviesItem';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function MoviesListContainer({movies}) {
  return (
    <Grid container spacing={3} direction="row" justify="center">
      {movies.map((movie, index) => {
        return (
          <Grid item xs={6} sm={3} key={index}>
            <MoviesItem movie={movie} />
          </Grid>
        )
      })}
    </Grid>
  )
}

function Loader() {
  return (
    <Grid
      className="classes.root"
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CircularProgress size={70} thickness={2}/>
    </Grid>
  )
}

export default function MoviesList() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    getMovieList('en-US', currentPage + 1).then(response => {
      setMovies(movies.concat(response.data.results))
      setCurrentPage(response.data.page);
    }).catch(() => {
      setError(true);
    })
  }

  useEffect(() => {
    getMovieList('en-US', 1).then(response => {
      setMovies(response.data.results)
      setCurrentPage(response.data.page)
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setError(true);
    })
  }, []);


  return (
    <div className={classes.root}>
      {error ? <Alert severity="error">An error occured, please try again later.</Alert> : ''}
      {isLoading ? <Loader /> :
        <>
          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <MoviesListContainer movies={movies}/>
          </InfiniteScroll>
        </>
      }
    </div>
  );
}
