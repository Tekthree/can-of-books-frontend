import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Form extends React.Component {
  render() {
    return(
      <form onSubmit={(e) => this.props.getMyBooks(e)}>
        <label>What is your email?</label>
        <input value={this.props.auth0.user.email} onChange={(e) => this.props.updateEmail(e.target.value)}></input>
        <button type='submit'>submit</button>
      </form>
    )
  }
}

export default withAuth0(Form);