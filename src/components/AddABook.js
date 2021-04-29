import React from 'react';

class AddABook extends React.Component {
  render() {
    return(
      <form onSubmit={(e) => this.props.createBook(e)}>
        <label>name of book</label>
        <input onChange={(e) => this.props.addBookName(e.target.value)}></input>
        <label>describe book</label>
        <input onChange={(e) => this.props.addBookDescription(e.target.value)}></input>
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default AddABook;