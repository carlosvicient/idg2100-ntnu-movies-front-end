import React from 'react';
import { fetchMovies } from '../api/movies';

class Home extends React.Component {
    state = {movies: []}
  
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
  
      const res = await fetchMovies();
      if (res.error) {
        //handle the error here the way you want...
        //this.setState({ error: res.error });
      }
      else {
        console.log('This is the result of the fetchMovies: ', res)
        this.setState({ movies: res.data });
      }
    }
  
    render() {
      const movies = this.state.movies;
      return (
        <>
          <div>I am the home page</div>
          <ul>
            {movies.map((movie) => (
              <li key={movie._id}>{movie.title}</li>
            ))}
          </ul>
        </>
      );
    }
  }

  export default Home;