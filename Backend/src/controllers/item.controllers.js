const uploadOnCloudinary = require('../utils/cloudinary')
const Shop = require('../models/shop.model')
const Item = require('../models/item.model')


const addItem = async (req, res) => {

    try {
        const { name, category, foodType, price, image: imageUrl } = req.body

        let image = null;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      image = await uploadOnCloudinary(imageUrl);
    }

    if (!image) {
      return res.status(400).json({ message: "Image upload failed or missing" });
    }
        const shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            return res.status(404).json({ message: "shop not found" })
        }
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })

        shop.items.push(item._id)
        await shop.save()
        await shop.populate('items owner')

        return res.status(201).json(item)

    } catch (err) {
        return res.status(500).json({ message: `add item error ${err}` })
    }
}

const editItem = async (req, res) => {

    try {
        const itemId = req.params.itemId

        const { name, category, foodType, price } = req.body

        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate(itemId, { name, category, foodType, price }, { new: true })

        if (!item) {
            return res.status(404).json({ message: 'item not found' })
        }

        const shop = await Shop.findOne({owner: req.userId}).populate('items')

        return res.status(200).json(shop)

    } catch (err) {
        return res.status(500).json({ message: `edit item error ${err}` })
    }
}
const getItemById = async(req, res)=>{
    try{
        const itemId = req.params.itemId

        const item = await Item.findById(itemId)

        if (!item) {
            return res.status(404).json({ message: 'item not found' })
        }

        return res.status(200).json(item)

    }catch(err){
        return res.status(500).json({ message: `get item error ${err}` })
    }
}

module.exports = { addItem, editItem, getItemById }