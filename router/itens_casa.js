const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('itens_casa');
});

module.exports = router;