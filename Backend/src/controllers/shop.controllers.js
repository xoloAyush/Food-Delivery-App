import { findOne } from '../models/user.model'

const uploadOnCloudinary = require('../utils/cloudinary')

const Shop = require('../models/shop.model')

export const createEditShop = async (req, res) =>{

    try{
        const {name, city, state, address} = req.body

        let image
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        let shop = await findOne({ owner: req.userId})

        if(!shop){
           shop =  await Shop.create({
            name, city, state, address, image,
            owner: req.userId
        })
        }
        else{
            shop = await Shop.findByIdAndUpdate(shop_id , {name, city, state, address, image, owner: req.userId})
        }
        await shop.populate('owner')
        return res.status(201).json(shop)

    }catch(err){
        return res.status(500).json({
            message: `create shop error ${err}`
        })
    }
}

