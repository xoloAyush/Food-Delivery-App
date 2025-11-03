const express = require('express')

const { isAuth } = require('../middlewares/isAuth');
const {createEditShop} = require('../controllers/shop.controllers');

const shopRouter = express.Router()

const {upload} = require('../middlewares/multer')

shopRouter.get('/create-edit', isAuth, upload.single("image"), createEditShop )

module.exports = shopRouter