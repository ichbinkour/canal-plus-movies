import axios from 'axios';

const API_KEY = "92b418e837b833be308bbfb1fb2aca1e"
const API_URL = "https://api.themoviedb.org/3"

const api = axios.create({
  baseURL: API_URL
})


export function getMovieList(lang, page, query) {
  if (query !== undefined) {
    return api.get(`/search/movie?api_key=${API_KEY}&language=${lang || 'en-US'}&query=${query}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
  } else
    return api.get(`/discover/movie?api_key=${API_KEY}&language=${lang || 'en-US'}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
}
