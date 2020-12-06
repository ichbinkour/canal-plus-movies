import React, { useEffect, useState } from 'react';
import { getMovieList, getGenresList } from '../../api';

import InfiniteScroll from 'react-infinite-scroll-component';

import MoviesItem from './MoviesItem';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      color: 'white'
    },
    searchRoot: {
      '& > *': {
        marginBottom: '1rem',
        width: '100%',
        marginTop: 80,
        color: 'white'
      },
    },
  }),
);

function MoviesListContainer({movies, genres}) {
  return (
    <Grid container spacing={3} direction="row" justify="center">
      {movies.map((movie, index) => {
        if (movie.poster_path !== null) {
          return (
            <Grid item xs={6} sm={3} lg={2} key={index}>
              <MoviesItem movie={movie} genres={genres}/>
            </Grid>
          )
        } else {
          return null
        }
      })}
    </Grid>
  )
}

function Loader() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CircularProgress size={70} thickness={2}/>
    </Grid>
  )
}

function SearchInput({next}) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const fetchData = (value) => {
    getMovieList('en-US', 1, value.replace(/ /g, '').length > 0 ? value : undefined).then(response => {
      next({response: response.data, query: value, error: false})
    }).catch((e) => {
      next({response: null, query: value, error: true})
    })
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    fetchData(event.target.value);
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} lg={6} className={classes.searchRoot}>
        <TextField id="outlined-basic" label="Search a movie" variant="outlined"
          value={value}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  )
}

function EmptyMoviesList() {
  return (
    <Grid container justify="center">
      <h3>No results</h3>
    </Grid>
  )
}

export default function MoviesList() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(500);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [querySearch, setQuerySearch] = useState('');
  const [genres, setGenres] = useState([]);

  const fetchData = () => {
    if (currentPage !== maxPage) {
      getMovieList('en-US', currentPage + 1, querySearch.length > 0 ? querySearch : undefined).then(response => {
        setMovies(movies.concat(response.data.results))
        setCurrentPage(response.data.page)
        setMaxPage(response.data.total_pages)
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
        setError(true);
      })
    }
  }

  const fetchGenres = () => {
    getGenresList().then(response => {
      setGenres(response.data.genres)
    }).catch(() => {
      setError(true);
    })
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    fetchGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = (event) => {
    if (event.error) {
      setError(true);
    } else {
      setMaxPage(event.response.total_pages)
      setMovies(event.response.results);
      setCurrentPage(event.response.page);
      setQuerySearch(event.query)
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      {error ? <Alert severity="error">An error occured, please try again later.</Alert> : ''}

      <SearchInput next={handleNext}></SearchInput>

      {movies.length === 0 && !isLoading ? <EmptyMoviesList /> : ''}

      {isLoading ? <Loader /> :
        <>
          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<span></span>}
          >
            <MoviesListContainer movies={movies} genres={genres}/>
          </InfiniteScroll>
        </>
      }
    </div>
  );
}
