const express = require('express')
const {signIn, signUp, signOut, 
    sendOtpMail, verifyOtp, 
    resetPassword, googleAuth } = require('../controllers/auth.controllers')

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/signout',signOut)

router.post('/send-otp',sendOtpMail)
router.post('/verify-otp',verifyOtp)
router.post('/reset-password',resetPassword)
router.post('/google-auth', googleAuth)
module.exports = router