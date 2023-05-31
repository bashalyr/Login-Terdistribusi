// server.js

const express = require('express');
const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;

const app = express();
const port = 3000;

// Konfigurasi OpenID Connect
const oidcConfig = {
  issuer: 'https://example.com', // URL OpenID Connect provider Anda
  authorizationURL: 'https://example.com/authorize',
  tokenURL: 'https://example.com/token',
  userInfoURL: 'https://example.com/userinfo',
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: 'http://localhost:3000/auth/openid/callback',
};

// Konfigurasi Passport
passport.use(
  'openidconnect',
  new OpenIDConnectStrategy(oidcConfig, (tokenset, userinfo, done) => {
    // Anda dapat melakukan validasi tambahan atau menyimpan data pengguna di sini
    return done(null, userinfo);
  })
);

// Menyediakan endpoint untuk login menggunakan OpenID Connect
app.get(
  '/auth/openid',
  passport.authenticate('openidconnect', {
    session: false,
  })
);

// Menangani callback setelah login menggunakan OpenID Connect
app.get(
  '/auth/openid/callback',
  passport.authenticate('openidconnect', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    // Redirect ke halaman setelah login berhasil
    res.redirect('/dashboard');
  }
);

// Contoh route terproteksi
app.get('/dashboard', (req, res) => {
  // Hanya pengguna yang terautentikasi yang dapat mengakses halaman ini
  if (req.isAuthenticated()) {
    res.send('Selamat datang di Dashboard!');
  } else {
    res.redirect('/login');
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});
