import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";


class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      bookName: '',
      bookDescription: '',
      newBooks: []
    };
  }

  closeModalHandler = () => {
    this.setState({
      showModal: false,
    });
  };

  addBooks = async (event) => {
    event.preventDefault();
    try {
      const bookAdd = `https://best-books-backend-hunt-tek.herokuapp.com/books`;
      const response = await axios.post(bookAdd,{email: this.props.auth0.user.email, name: this.state.bookName, description: this.state.bookDescription});

      const books = response.data;
      this.setState({ newBooks: books });
      
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    // console.log("the is the movies response", this.state.bookDescription);
    // console.log('new books', this.state.newBooks);
    return (
      <div>
        <Button
          variant="primary"
          onClick={() => this.setState({ showModal: true })}
        >
          Add
        </Button>

        <Modal show={this.state.showModal} onClose={this.closeModalHandler}>
          <Modal.Header
            closeButton
            onClick={() => this.setState({ showModal: false })}
          >
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container>
          <h1>Add A Book?</h1>
          <form onSubmit={(e) => this.props.createBook(e)}>
            <Form.Group role="form" controlId="getCityLocation">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder=" Name"
                onChange={(e) => this.props.addBookName(e.target.value)}
              />
              
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={(e) => this.props.addBookDescription(e.target.value)}
              />
              
            </Form.Group>
            <Button variant="primary" type="submit"               
            onClick={() => this.setState({ showModal: false })}>
              Add
            </Button>
          </form>
        
        </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default withAuth0(MyModal);