const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String
    },
    mobile:{
        type:String,
        required: true
    },

    role:{
        type:String,
        eum: ['user','owner','deliveryBoy'],
        required: true
    },
    resetOtp:{
        type: String,
    },
    isOtpVerified:{
        type: Boolean,
        default: true
    },
    otpExpires:{
        type:Date
    }

},{ timestamps: true
})

module.exports = mongoose.model("User", userSchema)
