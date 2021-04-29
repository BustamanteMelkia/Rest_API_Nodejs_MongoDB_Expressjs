const { request, response, json } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJSW = async (req=request, res=response, next)=>{
    
    const {token} = req.headers;
    try {
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        const { uid } = payload;

        const user = await  User.findById(uid);
        if(!user) return json.status(400).json({msg: "User not exist"});

        if(!user.status) return res.status(401).json({ msg: "User not exist, status=false" })
        req.user = user;
        // console.log(payload);
        next();
    } catch (error) {
        res.status(401).json({
            msg: "Invalid token"
        })
    }

}

module.exports = {
    validateJSW
};
