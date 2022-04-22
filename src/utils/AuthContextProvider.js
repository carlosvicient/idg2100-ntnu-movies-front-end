//Inspired by https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/users';

// You can define what you need in the state. You may not need isLoading, or user or token
const INITIAL_STATE = { isAuth: false, isLoading: true, token: null, user: null };

const AuthContext = React.createContext();

// Local storage key prefix hardcoded - remember: localStorage is not a good in terms of security
const KEY = "AUTH_APP-";

class AuthProvider extends React.Component {
  state = { ...INITIAL_STATE };

  async componentDidMount() {
    // This method will be executed every time we reload the page
    // If we don't do anything, an authenticated user will no longer
    // be authenticated after reloading and, therefore, won't be able 
    // to access to the protected pages.
    const token = localStorage.getItem(KEY + "token");
    const user = localStorage.getItem(KEY + "user");

    // if user exist and has token set new state
    if (token && user) {
      this.setState({ isAuth: true, token, user, isLoading: false }, () => {
        console.log("==> AuthProvider ");
        console.log("  ==> isAuth: ", this.state.isAuth);
        console.log("  ==> isLoading: ", this.state.isLoading);
        console.log("  ==> token: ", this.state.token);
        console.log("  ==> user: ", this.state.user);
      });
    }
    // Otherwise, reset the state and set isLoading to false so that the ProtectedRoute can be updated
    else {
      this.setState({ ...INITIAL_STATE, isLoading: false });
    }
  }

  login = async (userData) => {

    const { email, password } = userData;
    try {
      const response = await login(email, password);

      //Current API only returns token as "data"
      const { token, user } = {token: response.data, user: "No name"};

      //Remember, not recommended using localStorage!
      localStorage.setItem(KEY + "token", token);
      localStorage.setItem(KEY + "user", user);

      this.setState({ isAuth: true, token, user, isLoading: false });
      return response.data;
    } catch (err) {
      this.setState({ ...INITIAL_STATE, isLoading: false });
      // The Login component using this function should capture the error and so something there
      return err.response.data;
    }
  };

  logout = async () => {
    //The only goal of the logout is to inform the front-end the user is no longer
    //authenticated. Depending on your solution, you may or may not send a requet to the API

    //We use a timeout to fake a API query
    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.removeItem(KEY + "token");
    localStorage.removeItem(KEY + "user");

    // Reset the state
    this.setState({ ...INITIAL_STATE, isLoading: false });
  };

  // Let's add a function that generates the HTTPHeaders with the Bearer token
  generateHeaders = () => {
    const request = {};
    const token = this.state.token;

    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return request;
  }


  // The AuthProvider will expose: isAuth, isLoading, token and user as well as login, logout and generateHeaders functions
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isLoading: this.state.isLoading,
          token: this.state.token,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          generateHeaders: this.generateHeaders
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };