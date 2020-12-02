import React, {useState, useEffect} from 'react';
import './App.scss';

import Movie from "./components/Movie";

function App() {
  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    setMovies(['1', '2', '3'])
  }, [])

  return (
    <div className="App">
      <header className="header">
        <div>
          <h1>myCanal movies list</h1>
        </div>
      </header>
      <main>
        {movies.map((movie) => (
          <Movie key={movie}/>
        ))
          
        }
      </main>
    </div>
  );
}

export default App;
