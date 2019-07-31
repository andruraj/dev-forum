const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests posts api
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'posts api working'
}));

module.exports = router;