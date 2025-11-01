const express = require('express')

const { isAuth } = require('../middlewares/isAuth');
const { getCurrentUser } = require('../controllers/user.controller');

const router = express.Router()

router.get('/current', isAuth,getCurrentUser)

module.exports = router