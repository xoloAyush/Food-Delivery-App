const express = require('express')

const { isAuth } = require('../middlewares/isAuth');
const {createEditShop, getMyShop} = require('../controllers/shop.controllers');

const shopRouter = express.Router()

const {upload} = require('../middlewares/multer')

shopRouter.post('/create-edit', isAuth, upload.single("image"), createEditShop )

shopRouter.get('/get-my', isAuth, getMyShop)

module.exports = shopRouter