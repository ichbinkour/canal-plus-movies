import React from 'react';
import './App.css';

import BaseAppBar from "./components/BaseAppBar";
import MoviesList from "./components/Movies/MoviesList";

function App() {
  return (
    <div>
      <BaseAppBar />
      <div className="container">
        <MoviesList />
      </div>
    </div>
  );
}

export default App;
