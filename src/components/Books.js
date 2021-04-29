import React from 'react';
import axios from 'axios';
import UpdateBook from './UpdateBook';
import ListGroup from 'react-bootstrap/ListGroup';

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
    return (
      <>
        <h2>Welcome to the Book Registry!</h2>
        <p>To find your registry of books, enter your email below.</p>

        <ListGroup>
          {this.props.books ? this.props.books.map((book, idx) => (
            <ListGroup.Item key={idx}>
              <p>name:{book.name}</p>
              <p>description:{book.description}</p>
              <button onClick={() => this.deleteBook(idx)}>delete</button>
              <button onClick={() => this.displayUpdateBook(idx)}>update</button>
            </ListGroup.Item>
          )) : <div></div>}
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