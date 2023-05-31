// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const handleLogin = () => {
    // Mengarahkan pengguna ke halaman login OpenID Connect
    window.location.href = 'http://localhost:3000/auth/openid';
  };

  return (
    <div>
      <h1>Silakan Login</h1>
      <button onClick={handleLogin}>Login dengan OpenID Connect</button>
    </div>
  );
};

const Dashboard = () => {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    // Mengambil data pengguna setelah berhasil login
    axios.get('/userdata').then((response) => {
      setUserData(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Selamat datang di Dashboard!</h1>
      {userData && (
        <div>
          <h2>Informasi Pengguna:</h2>
          <p>Nama: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      <Link to="/logout">Logout</Link>
    </div>
  );
};

const Logout = () => {
  const handleLogout = () => {
    // Mengarahkan pengguna ke halaman logout OpenID Connect
    window.location.href = 'https://example.com/logout';
  };

  return (
    <div>
      <h1>Anda telah logout.</h1>
      <button onClick={handleLogout}>Logout dari OpenID Connect</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/logout" component={Logout} />
    </Router>
  );
};

export default App;
