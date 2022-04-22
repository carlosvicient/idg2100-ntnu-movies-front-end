import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AuthConsumer } from './utils/AuthContextProvider';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Logout from './components/Logout';

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
                  <Route path="admin" element={<Admin />} />
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

export default App;