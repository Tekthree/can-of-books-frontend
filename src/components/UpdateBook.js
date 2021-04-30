import React from 'react';
import axios from 'axios';

class UpdateBook extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bookName: '',
      bookDescription: ''
    }
  }

  updateBook = async (e) => {
    e.preventDefault();
    const SERVER = 'https://best-books-backend-hunt-tek.herokuapp.com';
    try {
      const updatedBookAxiosArray = await axios.put(`${SERVER}/books/${this.props.index}`, { newBook: {name: this.state.bookName, description: this.state.bookDescription}, email: this.props.email});

      const updatedBookArray = updatedBookAxiosArray.data;
      this.props.updateBooks(updatedBookArray);
      this.props.hideUpdateBook()
    } catch(err){
      console.error(err);
    }
  }

  render() {
    // console.log('update books', this.props)
    return(
      <form onSubmit={this.updateBook}>
        <label>Name of Book</label>
        <input onChange={(e) => this.setState({bookName:e.target.value})} placeholder={this.props.book.name}></input>
        <label>Description of Book</label>
        <input onChange={(e) => this.setState({bookDescription:e.target.value})}placeholder={this.props.book.description}></input>
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default UpdateBook;