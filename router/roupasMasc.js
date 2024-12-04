const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('roupas_masculinas');
});

module.exports = router;