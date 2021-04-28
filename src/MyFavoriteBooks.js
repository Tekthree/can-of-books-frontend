import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './MyFavoriteBooks.css';
import BestBooks from './components/BestBooks';


class MyFavoriteBooks extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <BestBooks/>

      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
