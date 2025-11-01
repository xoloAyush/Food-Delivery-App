const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken')

async function isAuth(req, res, next){

    try{

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // ✅ Verify token properly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded)

    // ✅ Use `findById` instead of `findOne`
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {isAuth }