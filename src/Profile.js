import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;
    console.log(this.props.auth0);
    return <div>
      <div>Hello {user.name}</div>
      <img src={user.picture} alt="Not Found" />
      <div>Email: {user.email}</div>
    </div>;
  }
}

export default withAuth0(Profile);
