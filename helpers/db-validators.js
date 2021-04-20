const Role = require('../models/role');
const User = require('../models/user');

// Asynchronus function thar verify if role is valid
const isValidRole = async (role = '')=> {
    const existRole = await Role.findOne({ role });
    if(!existRole) throw new Error(`Not exist ${role} role`);
};

// Asynchronus function that verify if email already exist
const existEmail = async ( email = '') =>{
    const emailExits = await User.findOne({ email });
    if(emailExits) throw new Error('Email Already exist');
}

module.exports = {
    isValidRole,
    existEmail
}