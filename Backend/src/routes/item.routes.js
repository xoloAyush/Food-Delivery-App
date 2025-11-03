const express = require('express')

const { isAuth } = require('../middlewares/isAuth');
const {editItem, addItem} = require('../controllers/item.controllers');

const {upload} = require('../middlewares/multer')

const itemRouter = express.Router()

itemRouter.post('/add-item', isAuth, upload.single("image"), addItem )
itemRouter.post('/add-item/:itemId', isAuth, upload.single("image"), editItem )


module.exports = itemRouter