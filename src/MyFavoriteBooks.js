import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron } from "react-bootstrap";
import "./MyFavoriteBooks.css";
import BestBooks from "./components/BestBooks";
import MyModal from "./components/modal.js";
import axios from "axios";
// import AddABook from './components/AddABook';
import Books from "./components/Books";
import { withAuth0 } from "@auth0/auth0-react";


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddABook: false,
      books: [],
      bookName: "",
      bookDescription: "",
    };
  }

  getMyBooks = async (e) => {
    e.preventDefault();
    const SERVER = "http://localhost:3001";
    try {
      const books = await axios.get(`${SERVER}/books`, {
        params: { email: this.props.auth0.user.email },
      });
      this.setState({ books: books.data });
    } catch (error) {
      console.error(error);
    }
  };

  setBooks = () => {
    fetch(`http://localhost:3001/books?email=${this.props.auth0.user.email}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result,
          });
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  

  addBookName = (bookName) => this.setState({ bookName });

  addBookDescription = (bookDescription) => {
    console.log(bookDescription);
    this.setState({ bookDescription });
  };

  createBook = async (e) => {
    e.preventDefault();
    const API = "http://localhost:3001";
    const books = await axios.post(`${API}/books`, {
      name: this.state.bookName,
      description: this.state.bookDescription,
      email: this.props.auth0.user.email,
    });
    this.setState({ showModal: false });
    return books;
  };

  removeABook = (arrayOfBooks) => this.setState({ books: arrayOfBooks });
  updateBooks = (books) => this.setState({ books });

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
          <BestBooks books={this.state.books} setBooks={this.setBooks} />
        </Jumbotron>
        <Jumbotron>
          <Books
            books={this.state.books}
            email={this.props.auth0.user.email}
            removeABook={this.removeABook}
            updateBooks={this.updateBooks}
          />

          <MyModal
            addBookName={this.addBookName}
            addBookDescription={this.addBookDescription}
            createBook={this.createBook}
          ></MyModal>
        </Jumbotron>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
