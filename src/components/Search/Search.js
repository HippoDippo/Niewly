import React from 'react';
import './Search.css';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchInput: ''
    }
  }

  componentDidMount() {
    this.setState({
      searchInput: this.props.searchInput
    });
  }

  componentWillReceiveProps(nextProps) {
    // <Search what={'/api/posts/:stuff'}/> or <Search what={'/api/users/:stuff'}/>
    // if (nextProps.searchInput !== this.props.searchInput) {
    console.log(nextProps.searchInput);  
    axios.get('/api/searchusers/' + nextProps.searchInput)
      .then(res => {
        this.setState({
          users: [...res.data]
        });
      });
      // this.setState({
      //   searchInput: nextProps.searchInput
      // });
  }

  render() {

    // if (this.state.users)
    // let users = this.state.users.map((e, i, arr) => {
    //   return (<div key={arr[i].id} id={arr[i].id} className="User">
    //             <div className="User-header">
    //               <h2 className="User-heading">{arr[i].user_name}</h2>
    //               <img className="profile-img" src={arr[i].img} alt="profile image"/>
    //             </div>
    //               <div className="User-content">
    //               <ul className="User-items">
    //                 <div className="User-buttons">
    //                   <li onClick={this.handleFollowSave.bind(this, arr[i].id)} className="Post-item follow-button">Follow</li>
    //                 </div>
    //               </ul>
    //             </div>
    //           </div>
    //   );
    // });
    console.log(this.state.users);
    return (
      <div className="Search-Results">
        <h1>Search Results</h1>
      </div>
    );
  }
}

export default Search;