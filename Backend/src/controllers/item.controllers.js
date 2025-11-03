const uploadOnCloudinary = require('../utils/cloudinary')
const Shop = require('../models/shop.model')
const Item = require('../models/item.model')


export const addItem = async(req, res)=>{

    try{
        const {name, category, foodType, price} = req.body

        let image
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)

            }
        const shop = await Shop.findOne({ owner: req.userId})

        if(!shop){
            return res.status(404).json({message:"shop not found"})
        }
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })

        return res.status(201).json(item)
    }catch(err){
        return res.status(500).json({message: `add item error ${err}`})
    }
}

export const editItem = async(req, res)=>{

    try{
        const itemId = req.params.itemId

        const {name, category, foodType, price} = req.body

        let image
        if(req.file){
            image= await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate( itemId ,{name, category, foodType, price}, { new: true})

        if(!item){
            return res.status(404).json({ message: 'item not found'})
        }
        return res.status(200).json(item)

    }catch(err){
        return res.status(500).json({message :`edit item error ${err}`})
    }
}