const shopModel = require('../models/shop.model');
const uploadOnCloudinary = require('../utils/cloudinary');


const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);

      console.log(req.file)
    }

    // ❌ You missed the model reference before findOne
    let shop = await shopModel.findOne({ owner: req.userId });

    if (!shop) {
      shop = await shopModel.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      // ❌ shop_id is not defined; use shop._id
      shop = await shopModel.findByIdAndUpdate(
        shop._id,
        { name, city, state, address, image, owner: req.userId },
        { new: true }
      );
    }

    await shop.populate('owner items');
    return res.status(201).json(shop);
  } catch (err) {
    return res.status(500).json({
      message: `create shop error: ${err.message}`,
    });
  }
};

const getMyShop = async (req, res) => {
  try {
    const shop = await shopModel
      .findOne({ owner: req.userId })
      .populate('owner items');

    if (!shop) {
      return res.status(404).json({ message: 'No shop found' });
    }

    return res.status(200).json(shop);
  } catch (err) {
    return res.status(500).json({
      message: `get my shop error: ${err.message}`,
    });
  }
};

// ✅ FIXED EXPORT
module.exports = { getMyShop, createEditShop };
