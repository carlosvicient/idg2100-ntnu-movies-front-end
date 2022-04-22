import * as React from 'react';
import { Route, Routes, Link, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';

import { AuthConsumer, AuthContext } from './utils/AuthContextProvider';

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthConsumer>
        {({ isAuth }) => (
          <>
            {/* TIP: replaced by specific component for navigation */}
            <header className="App-header">
              {/* TIP: this is not good in terms of accessibility. We should use nav + ul>li  */}
              <Link to="/">Public</Link>

              {/* Now we can use the AuthConsumer to know if the user is authenticated and show specific elements in the menu */}
              {isAuth && <Link to="/dashboard">Dashboard</Link>}

              {!isAuth && <Link to="/login">Log in</Link>}

              {/* Only show link if authenticated user */}
              {isAuth && <Link to="/logout">Log out</Link>}
            </header>
            <main>
              <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )}
      </AuthConsumer>

    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  // We could also replace React.useContext by a more declarative syntax using <AuthConsumer> like we did in <App>
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  return (
    <>
      {auth.isLoading && <p>Loading</p>}
      {auth.isAuth && (children ? children : <Outlet />)}
      {!auth.isLoading && !auth.isAuth && <Navigate to="/login" state={{ from: location }} replace />}
    </>
  )
}

const Home = () => {
  return (<div>I am the home page</div>);
}

const Dashboard = () => {
  return (<div>I am the dashboard</div>);
}

const Login = () => {
  // The login can take profit of useNavigate and useLocation hooks 
  // to redirect the user to different pages when needed
  // See example: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx 

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  //This component needs to execute the "login" function of the AuthProvider
  //In this case we will use the AuthContext and the useContext hook
  const auth = React.useContext(AuthContext);

  const handleClick = async () => {
    console.log("click");

    const user = await auth.login({ email: 'asd', password: 'asd' });
    console.log("user from login API:", user);

    // https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx 
    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    navigate(from, { replace: true });
  }

  return (
    <div>
      <p>I am the Login</p>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

const Logout = () => {
  let navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleClick = () => {
    auth.logout();
    navigate('/');
  }

  return (
    <div>
      <p>I am the Logout. Ready to leave, {auth.user}</p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

const NotFound = () => {
  return (<div>This page does not exist</div>);
}

export default App;