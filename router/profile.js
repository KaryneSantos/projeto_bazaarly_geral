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
    if (!req.session.user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    res.render('home', {user: req.session.user});
});


module.exports = router;