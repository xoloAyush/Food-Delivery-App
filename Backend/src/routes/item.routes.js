const express = require('express')

const { isAuth } = require('../middlewares/isAuth');
const {editItem, addItem, getItemById} = require('../controllers/item.controllers');

const {upload} = require('../middlewares/multer')

const itemRouter = express.Router()

itemRouter.post('/add-item', isAuth, upload.single("image"), addItem )
itemRouter.post('/add-item/:itemId', isAuth, upload.single("image"), editItem )
itemRouter.put('/edit-item/:itemId', isAuth, upload.single("image"), editItem )


itemRouter.get('/get-by-id/:itemId', isAuth, getItemById )


module.exports = itemRouter