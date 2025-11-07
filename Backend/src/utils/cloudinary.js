const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (input) => {
  try {
    let result;

    // ✅ Case 1: Input is a remote URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      result = await cloudinary.uploader.upload(input, {
        folder: 'food_items',
      });
      return result.secure_url;
    }

    // ✅ Case 2: Input is a local file path
    result = await cloudinary.uploader.upload(input, {
      folder: 'food_items',
    });

    // Safely delete the local file after upload
    if (fs.existsSync(input)) {
      fs.unlinkSync(input);
    }

    return result.secure_url;
  } catch (err) {
    console.error('❌ Cloudinary upload error:', err);

    // Avoid crashing if file doesn't exist
    if (fs.existsSync(input)) {
      fs.unlinkSync(input);
    }

    return null;
  }
};

module.exports = uploadOnCloudinary;




// const { v2: cloudinary } = require('cloudinary');
// const fs = require('fs');
// //  to delete

// const uploadOnCloudinary = async(file)=>{

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

//     try{

//         const result = await cloudinary.uploader.upload(file)

//         fs.unlinkSync(file)
//         return result.secure_url
//     }catch(err){
//         fs.unlinkSync(file)
//         console.log(err)
//     }
// }

// module.exports = uploadOnCloudinary