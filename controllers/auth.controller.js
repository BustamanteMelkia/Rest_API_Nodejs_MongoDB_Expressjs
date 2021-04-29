const Req = require('express').request;
const Res = require('express').response;
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jsonwebtoken');

const login = async (req = Req, res = Res)=>{
    const { email, password } = req.body;
    try {   
        // Verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: "Email has not been registered yet"
            });
        }
        // Si el usuario está activo
        if(!user.status){
            return res.status(400).json({
                msg: "User not exist, status=false"
            });
        }
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Invalid password"
            });
        }
        // Generar JWT
        const token = await generateJWT(user.id)
        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something was wrong"
        });
    }
}

module.exports = {
    login
}