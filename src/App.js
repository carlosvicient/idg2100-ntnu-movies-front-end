import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* TIP: replaced by specific component for navigation */}
      <header className="App-header">
        {/* TIP: this is not good in terms of accessibility. We should use nav + ul>li  */}
        <Link to="/">Public</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Log in</Link>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

const Home = () => {
  return (<div>I am the home page</div>);
}

const Dashboard = () => {
  return (<div>I am the dashboard</div>);
}

const Login = () => {
  return (<div>I am the Login</div>);
}

const NotFound = () => {
  return (<div>This page does not exist</div>);
}
 
export default App;
