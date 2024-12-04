const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
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
        return res.redirect('/login');
    }
    res.render('profile_user', { user: req.session.user });
});



module.exports = router;