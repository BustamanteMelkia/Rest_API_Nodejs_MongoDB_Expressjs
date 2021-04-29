const bcrypt = require('bcryptjs');

const User = require('../models/user');



const userGet = async (req, res)=>{
    // res.set('Content-Type', 'text/html');
    // Query params
    // localhost:8080/user?from=5&limit=4
    const query = { status: true };
    const { from=0, limit=5 } = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        users
    })
}

const userPost = async (req, res)=>{
    let { name, email, password, role } = req.body;

    // Generate password hash
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)

    // Create document
    const user = new User({name, email, password, role});

    // Save document
    await user.save();

    // res.status(400).send('Hola mundo')
    res.json({ user });
}

const userPut = async (req, res)=>{
    // res.set('Content-Type', 'application/json')
    const { id } = req.params;
    const { _id, password, google, ...remaining } = req.body;
    // console.log(password, google, remaining)
    if(password){
        // Generate password hash
        const salt = bcrypt.genSaltSync();
        remaining.password = bcrypt.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, remaining);


    
    console.log(req.params)
    res.json({
        method: 'PUT',
        user
    })
}

const userDelete = async (req, res)=>{
    const { id } = req.params;
    
    // const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate(id, { status: false });
    res.json({
        removed: user,
        authenticated: req.user
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}