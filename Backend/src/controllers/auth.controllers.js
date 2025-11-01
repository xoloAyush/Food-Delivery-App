const userModel  = require('../models/user.model')

const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const sendOtp = require('../utils/mail')

async function signUp(req, res){

    try{
        
    const {fullName, email, password,mobile,role} = req.body

    let userExist = await userModel.findOne({email})

    if(userExist){
        return res.status(400).json({
            message:"user already register"
        })
    }
    if(password.length < 6){
        return res.status(400).json({
            message:"Password must be longer than 6 characters"
        })
    }
    if(mobile.length !== 10){
        return res.status(400).json({
            message:"Mobile number must be 10 digits"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        fullName,
        email:email,
        password: hashedPassword,
        mobile,
        role
    })

    const token = jwt.sign({ "id":user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    )

    res.cookie("token", token,{
        secure: false,
        sameSite:"strict",
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
    )

     return res.status(201).json({
      message: "User registered successfully",
       user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
}
catch(err){
    console.error("Error in signUp:", err);
    res.status(500).json({ message: `sign out error ${err}` });
}

}

async function signIn(req, res){

    try{
        
    const {email, password} = req.body

    let userExist = await userModel.findOne({email})

    if(!userExist){
        return res.status(400).json({
            message:"user is not registered"
        })
    }
    
    const passwordMatch = await bcrypt.compare(password, userExist.password)

    if(!passwordMatch){
        return res.status(401).json({
            message: "invalid password"
        })
    }


    const token = jwt.sign({ "id":userExist._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    )

    res.cookie("token", token,{
        secure: false,
        sameSite:"strict",
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
    )

     return res.status(200).json({
  message: "User logged in successfully",
  user: {
    id: userExist._id,
    fullName: userExist.fullName,
    email: userExist.email,
    role: userExist.role
  }
});

}
catch(err){
    console.error("Error in signUp:", err);
    res.status(500).json({  message: `sign in error ${err}` });
}

}

async function signOut(req, res) {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.error("Error in signOut:", err);
    res.status(500).json({ message: `sign out error ${err}` });
  }
}

const sendOtpMail = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    // ✅ Generate OTP (4-digit)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // ✅ Save OTP + expiry
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
    user.isOtpVerified = false;
    await user.save();

    // ✅ Send mail using utility
    await sendOtp(email, otp); // ← your utils/mail.js function

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("otp error", err);
    return res.status(500).json({ message: `send otp error ${err.message}` });
  }
};


const verifyOtp = async(req, res)=>{
    try{
        const {email, otp} = req.body

        const user = await userModel.findOne({email})
        if(!user || user.resetOtp!= otp || user.otpExpires< Date.now()){

            return res.status(409).json({ message:"invalid/expired otp"})
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save()
        return res.status(200).json({ message:"otp verify successfully"})
    }catch(err){
        console.error("verify otp error", err);
    res.status(500).json({  message: `verify otp error ${err}` });
    }
}

const resetPassword = async (req, res) => {
    try{

        const {email, newPassword} = req.body

        if(newPassword.length < 6){
        return res.status(400).json({
            message:"Password must be longer than 6 characters"
        })
    }

        const user = await userModel.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message:"user does not exist"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)

        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()

        return res.status(200).json({message: "otp verify successfully"})

    }catch(err){
        return res.status(500).json(`reset password error ${err}`)
    }
}

const googleAuth = async (req, res)=>{
    try{
        const {fullName, email, mobile, role} = req.body

        let user = await userModel.findOne({email})
        if(!user){
            user = await userModel.create({
                fullName, email, mobile, role
            })
        }

        const token = jwt.sign({ "id":user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "7d"}
    )

    res.cookie("token", token,{
        secure: false,
        sameSite:"strict",
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    })
    return res.status(201).json({user})

    }catch(err){
        res.status(500).json({ message: `googleAuth error ${err}` });
    }
}

module.exports = { signUp, signIn, signOut , 
    sendOtpMail, verifyOtp, resetPassword , googleAuth
}