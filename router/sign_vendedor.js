const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup_vendedor');
});

module.exports = router;