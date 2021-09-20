import NavBar from "./components/navBar/NavBar";
import SinglePost from './pages/singlePost/SinglePost';
import Home from './pages/home/Home';
import AllBlogs from "./pages/allBlogs/AllBlogs";
import UserBlogs from "./pages/userBlogs/UserBlogs";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";

import { UserContext } from './components/context/ContextProvider';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from "react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      all_blogs: [],
      user_blogs: []
    }
  }

  handleUserData = (data) => {
    console.log('Updating USerdata with data', data);
    this.setState({user: data})
  }

  setAllBlogs = (data) => {
    console.log('Updating All blogs with data', data);
    this.setState({all_blogs: data});
  }

  setUserBlogs = (data) => {
    console.log('Updating User blogs with data', data);
    this.setState({user_blogs: data});
  }

  render() {
    const { user } = this.state;
    console.log('APP user ---', user);
    return (
      <UserContext.Provider value={{data:this.state, handleUserData: this.handleUserData, setAllBlogs:this.setAllBlogs, setUserBlogs:this.setUserBlogs}}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/register" render={(props) => <Register {...props} />} />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/logout" render={(props) => <Logout {...props} />} />
            <Route path="/blog/:id" render={(props) => <SinglePost {...props} />} />
            <Route path="/all-blogs" render={(props) => <AllBlogs {...props} />} />
            <Route path="/user-blogs" render={(props) => <UserBlogs {...props} />} />
            <Route path="/write" render={(props) => <Write {...props} />} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
