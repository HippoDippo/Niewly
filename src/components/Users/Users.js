import React from 'react';
import './Users.css';
import axios from 'axios';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('/api/getAllUsers')
    .then(res => {
      this.setState({
        users: [...res.data]
      });
    });
  }

  handleFollowSave() {
    //
    console.log('Followed!');
  }

  render() {

    let users = this.state.users.map((e, i, arr) => {
      return (<div key={arr[i].id} id={arr[i].id} className="Post">
                <div className="Post-header">
                  <h2 className="Post-heading">{arr[i].user_name}</h2>
                  <img className="profile-img" src={arr[i].img} alt="profile-img"/>
                </div>
                <div className="Post-content">
                  <ul className="Post-items">
                    <div className="Post-buttons">
                      <li onClick={this.handleFollowSave.bind(this, arr[i].id)} className="Post-item save-button">Follow</li>
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    return (
      <div className="Posts">
        {users}
      </div>
    );
  }
}

export default Users;