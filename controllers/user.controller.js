const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userGet = (req, res)=>{
    // res.status(400).send('Hola mundo')
    // res.set('Content-Type', 'text/html');
    // Query params
    const { name, hobby } = req.query;
    // localhost:8080/user?name=mel&hobby=freefire
    console.log(name, hobby)
    res.json({
        name: 'User',
        method: 'GET'
    })
}

const userPost = async (req, res)=>{
    let { name, email, password, role } = req.body;

    // Verify if email exist
    const emailExits = await User.findOne({ email });
    if(emailExits){
        // Finalize request
        return res.status(400).json({
            "msg": "Email already exist"
        });
    }

    // Generate password hash
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)

    // Create document
    const user = new User({name, email, password, role});

    // Save document
    await user.save();

    // res.status(400).send('Hola mundo')
    res.json({
        name: 'User',
        method: 'POST',
        user
    })
}

const userPut =  (req, res)=>{
    // res.status(400).send('Hola mundo')
    // res.set('Content-Type', 'application/json')
    const { id } = req.params;
    console.log(req.params)
    res.json({
        name: 'User',
        method: 'PUT',
        id
    })
}

const userDelete = (req, res)=>{
    // res.status(400).send('Hola mundo')
    res.json({
        name: 'User',
        method: 'DELETE'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}