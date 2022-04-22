import React from 'react';
import { createMovie, fetchMovies } from '../api/movies';
import { AuthContext } from '../utils/AuthContextProvider';

import './Dashboard.css';

// Function from: https://www.educative.io/edpresso/how-to-generate-a-random-number-between-a-range-in-javascript
function generateRandomNumber(min = 0, max = 100) {
  // find diff
  let difference = max - min;
  // generate random number 
  let rand = Math.random();
  // multiply with difference 
  rand = Math.floor(rand * difference);
  // add with min value 
  rand = rand + min;
  return rand;
}

function generateRandomString() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '');
}

const Movies = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie._id}>{movie.title} ({movie.year})</li>
      ))}
    </ul>
  );
}

class Dashboard extends React.Component {

  // Same as AuthContext but syntax for class components
  // context accessible via this.context.*
  static contextType = AuthContext;

  state = {
    movies: [],
    randomYear: generateRandomNumber(1900, 2022),
    randomTitle: generateRandomString()
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const res = await fetchMovies();
    //TODO: don't forget to handle the errors...
    console.log('This is the result of the fetchMovies: ', res)
    this.setState({ movies: res.data });
  }

  handleCreate = async () => {
    const headers = this.context.generateHeaders();
    const randomTitle = this.state.randomTitle
    const randomYear = this.state.randomYear;

    try {
      const res = await createMovie(headers, randomTitle, randomYear);
      console.log("Here we have the res, now update state: ", res);
      this.setState(prevState => ({
        movies: [...prevState.movies, res.data],
        randomYear: generateRandomNumber(1900, 2022),
        randomTitle: generateRandomString()
      }));
    }
    catch (err) {
      console.log("Here we have the error, now update state: ", err);
    }
  }

  render() {
    const movies = this.state.movies;
    const randomTitle = this.state.randomTitle
    const randomYear = this.state.randomYear;

    return (
      <div className='dashboard-component'>
        <h1>Dashboard (protected page)</h1>
        <p>I am the Dashboard. I will create random movies and render the list of movies</p>
        <div className='create-movie-container'>
          <h2>Create (requires token)</h2>
          <p>
            Why don't we add some random movies? Remember only authenticated users can "create" a movie.
            This means our request needs to include the http hader with the bearer token.
          </p>
          <div>
            <ul>
              <li>Randon title: {randomTitle}</li>
              <li>Random year: {randomYear}</li>
            </ul>
            <button onClick={this.handleCreate}>Create the movie now!</button>
          </div>
        </div>
        <div className='movie-list-container'>
          <h2>Current Movies (public: no token needed)</h2>
          <Movies movies={this.state.movies} />
        </div>
        {/* <Movies movies={this.movies} /> */}
      </div>
    );
  }
}

export default Dashboard;