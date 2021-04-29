import { Carousel } from "react-bootstrap";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null,
      isLoaded: false,
      setImages: [],
    };
  }

  getPhoto = async () => {
    const apiRoot = "https://api.unsplash.com";
    const accesKey = process.env.REACT_APP_UNSPLASH_API;
    try {
      const apiUrlLocation = `${apiRoot}/photos/random?client_id=${accesKey}&count=1`;
      const response = await axios.get(apiUrlLocation);
      const unsplashImg = response.data;
      this.setState({ setImages: unsplashImg });
      console.log(unsplashImg)
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    console.log(this.props.auth0.user.email);
    fetch(`http://localhost:3002/books?email=${this.props.auth0.user.email}`)
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

    this.getPhoto();
  }

  render() {
    console.log(this.state.setImages);
    return (
      <div>
        <Carousel>
          {this.state.books.map((item, index) => (
            <Carousel.Item style={{ height: "400px" }} interval={1000}>
              {this.state.setImages.map((images, index) => (
                <img
                  className="d-block w-100"
                  src={images.urls.regular}
                  alt="First slide"
                />
              ))}
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
