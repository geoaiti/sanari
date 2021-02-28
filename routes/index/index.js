const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.send(res.locals);
});

module.exports = router;