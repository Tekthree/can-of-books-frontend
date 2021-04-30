import { Carousel } from "react-bootstrap";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../MyFavoriteBooks.css";

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      // console.log(unsplashImg)
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    
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
    
    this.getPhoto();
  }

  render() {
    // console.log(this.state.setImages);
    console.log("this is the books in state", this.state.books);
    return (
      <div>
        <Carousel>
          {this.state.books.map((item, index) => (
            <Carousel.Item style={{ height: "600px" }} interval={1000}>
              {this.state.setImages.map((images, index) => (
                <img
                  className="image d-block w-100"
                  src={images.urls.regular}
                  alt="First slide"
                />
              ))}
              <Carousel.Caption>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
