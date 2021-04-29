import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron } from "react-bootstrap";
import "./MyFavoriteBooks.css";
import BestBooks from "./components/BestBooks";
import MyModal from "./components/modal.js";

class MyFavoriteBooks extends React.Component {
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
        <BestBooks />
        </Jumbotron>
        <Jumbotron>
          <h3>Add more books</h3>
          <p>
           Here you can add more books to your favorites
          </p>
          <p>
          <MyModal></MyModal>
          </p>
        </Jumbotron>
        
      </>
    );
  }
}

export default MyFavoriteBooks;
