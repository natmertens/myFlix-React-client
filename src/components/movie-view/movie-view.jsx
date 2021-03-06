import React from 'react';
import './movie-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  /*add a movie to favorites*/
  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.post(`https://natalies-myflix.herokuapp.com/users/${user}/movies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`${movie.Title} was added to your favorites`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
    console.log(movie);

    if (!movie) return null;

    return (
      <Card className="movie">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>

          <Card.Text>
            <span className="label description">Description: </span>
            <span className="value">{movie.Description}</span>
          </Card.Text>

          <Card.Text>
            <span className="label genre">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </Card.Text>

          <Card.Text>
            <span className="label director">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </Card.Text>

          <Link to={'/'}>
            <Button className="button-movie-view" variant="danger">Back to Movies</Button>
          </Link>

          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="button-movie-view" variant="danger">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="button-movie-view" variant="danger">Genre</Button>
          </Link>

          <Button className="button-movie-view" variant="danger" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>

        </Card.Body>
      </Card>
    );
  }
}

/*Definition of prop types*/
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};