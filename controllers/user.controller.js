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

const userPost = (req, res)=>{
    console.log('BODY',req.body);
    const { name, apellido } = req.body;
    // res.status(400).send('Hola mundo')
    res.json({
        name: 'User',
        method: 'POST',
        name,
        apellido
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