import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron } from "react-bootstrap";
import "./MyFavoriteBooks.css";
import BestBooks from "./components/BestBooks";
import MyModal from "./components/modal.js";
import axios from 'axios';
// import AddABook from './components/AddABook';
import Books from './components/Books';
import Form from './components/Form';

class MyFavoriteBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      displayAddABook: false,
      books: [],
      personEmail: '',
      bookName: '',
      bookDescription: ''
    }
  }

  getMyBooks = async (e) => {
    e.preventDefault();
    const SERVER = 'http://localhost:3001';
    try {
      const books = await axios.get(`${SERVER}/books`, { params: { email: this.state.personEmail } });
      this.setState({ books: books.data });

    } catch (error) {
      console.error(error);
    }
  
  }

  addBookName = (bookName) => this.setState({ bookName });
  addBookDescription = (bookDescription) => this.setState({ bookDescription });

  createBook = async (e) => {
    e.preventDefault();
    const API = 'http://localhost:3001';
    const books = await axios.post(`${API}/books`, { newBook: { name: this.state.bookName, description: this.state.bookDescription }, email: this.state.personEmail });
    const allBooksArray = books.data;
    this.setState({ books: allBooksArray, displayAddABook: false });
  }

  updateEmail = (email) => this.setState({ personEmail: email });

  removeABook = (arrayOfBooks) => this.setState({ books: arrayOfBooks });
  updateBooks = (books) => this.setState({ books });

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
        <BestBooks />
        </Jumbotron>
        <Jumbotron>
        <Books
          books={this.state.books}
          email={this.state.personEmail}
          removeABook={this.removeABook}
          updateBooks={this.updateBooks}
        />
        <Form
          updateEmail={this.updateEmail}
          getMyBooks={this.getMyBooks}
        />

        <button onClick={() => this.setState({ displayAddABook: true })}>Add a Book</button>

        {/* {this.state.displayAddABook &&
          <MyModal            
            addBookName={this.addBookName}
            addBookDescription={this.addBookDescription}
            createBook={this.createBook} ></MyModal>
        } */}
          

        </Jumbotron>
        
      </>
    );
  }
}

export default MyFavoriteBooks;
