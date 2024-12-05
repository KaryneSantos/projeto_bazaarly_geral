require('dotenv').config();
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(
    cookieSession({
      name: 'session',
      keys: [process.env.secret],
      maxAge: 3600000,
    })
);

router.get('/', (req, res) => {
  req.session = null;
  res.render('login');
});


module.exports = router;