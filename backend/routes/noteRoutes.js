const express = require('express')
const router = express.Router({mergeParams: true})
const {getNotes} = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

//protected route
router.route('/').get(protect, getNotes)

module.exports = router