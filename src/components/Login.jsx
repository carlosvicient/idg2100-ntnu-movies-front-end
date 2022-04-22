import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContextProvider";

const Login = () => {
  // The login can take profit of useNavigate and useLocation hooks 
  // to redirect the user to different pages when needed
  // See example: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx 

  // IMPORTANT: to handle and show message errors it would likely be necessary to set a stte
  // unfortunately, navigate and location (useNavigate, useLocation) hooks cannot be used in a class component.
  // therefore, the state needs to be updated using a hook as well
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [errors, setErrors] = useState(null);

  //This component needs to execute the "login" function of the AuthProvider
  //In this case we will use the AuthContext and the useContext hook
  const auth = React.useContext(AuthContext);

  const handleClick = async (email, password) => {
    console.log("handleClick:", email, password);

    try {
      const res = await auth.login({ email, password });
      console.log(res);

      if (res.errors) {
        //TODO notice you should do something here: show the error message for example.
        console.log("error...", res.errors);
        setErrors(res.errors);
      }
      else {
        // https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx 
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      }
    }
    catch (err) {
      console.log('Something went wrong. Do something: show message, redirect, etc.')
    }
  }

  return (
    <div>
      <h1>I am the Login</h1>
      <LoginForm onSubmit={handleClick} />
      {errors && <p>Oops! There has been an error. Try again!</p>}
    </div>
  );
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: ''
  }

  handleLogIn = (event) => {
    // Important: otherwise it will reload the page with login? and password? as query params in the url
    event.preventDefault();
    const {email, password} = this.state;

    // Passing info to parent via cb
    this.props.onSubmit(email, password);
    this.setState({ email: '', password: '' })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleLogIn}>
        <label>Email
          <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
        </label>

        <label>Password
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
        </label>

        <button type="submit">Log in</button>
      </form>
    );
  }
}


export default Login;