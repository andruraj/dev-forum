const express = require('express');
const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests profile api
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'profile api working'
}));

module.exports = router;