import { Carousel } from "react-bootstrap";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3002/books`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result,
          });

          console.log("this is the books in state", this.state.books);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
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
        <Carousel>
          {this.state.books.map((item, index) => (
            <Carousel.Item style={{ height: "400px" }} interval={1000}>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{item.description}</h3>
                <p>{item.name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
