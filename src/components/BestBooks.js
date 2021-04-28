import { Carousel } from "react-bootstrap";
import React, { Component } from "react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class BestBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null,
      isLoaded: false
    };
  }




  componentDidMount() {
    fetch(`http://localhost:3002/books`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result
          });

          console.log('this is the books in state',this.state.books[0])
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // componentDidMount() {
  //   getSearch = async (event) => {
  //     event.preventDefault();
  //     try {

  //       const getBooks = `https://localhost:3002/books&email=${this.props.auth0.user.email}`;
  //       const response = await axios.get(getBooks);
  //       const booksResponse = response.books;

      
  //       this.setState({books: booksResponse})
  //       console.log('this is the books in state',this.state.books.books)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // }

  render() {
    return (
      <div>
  
        <Carousel fade>
          <h2> Name {this.props.auth0.user.name}</h2>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
