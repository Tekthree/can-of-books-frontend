import React from 'react';
import axios from 'axios';
import UpdateBook from './UpdateBook';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import updateBookModal from "../components/updateBookModal";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUpdateBook: false,
      bookToUpdate: {},
      index: -1
    }
  }
  deleteBook = async (index) => {
    const newBooks = this.props.books.filter((book, i) => i !== index);

    this.props.removeABook(newBooks);

    await axios.delete(`http://localhost:3001/book/${index}`, { params: { email: this.props.email } });
  }

  displayUpdateBook = (idx) => {
    const bookToUpdate = this.props.books[idx];
    this.setState({
      displayUpdateBook: true,
      bookToUpdate,
      index: idx
    });
  }

  updateBooks = (booksArray) => {
    this.props.updateBooks(booksArray);
  }

  render() {
    console.log('book in books',this.props.books);
    return (
      <>
        <h2>Welcome to the Book Registry!</h2>
        <Button
          variant="primary"
          onClick={() => this.setState({ showModal: true })}
        >
          Update
        </Button>

        <ListGroup>
          {this.props.books.map((book, idx) => (
            <ListGroup.Item key={idx}>
              <p>name:{book.name}</p>
              <p>description:{book.description}</p>
              <button onClick={() => this.deleteBook(idx)}>delete</button>
              <button onClick={() => this.displayUpdateBook(idx)}>update</button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {this.state.displayUpdateBook &&
          <UpdateBook
            book={this.state.bookToUpdate}
            index={this.state.index}
            email={this.props.email}
            updateBooks={this.updateBooks}
            hideUpdateBook={() => this.setState({ displayUpdateBook: false })}
          />
        }
      </>
    )
  }
}

export default Books;