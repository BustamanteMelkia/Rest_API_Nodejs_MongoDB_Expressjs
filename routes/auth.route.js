const router = require('express').Router();
const { check } = require('express-validator');


const { login } = require('../controllers/auth.controller');
const {validateFields} = require('../middlewares/');


router.post('/login',[
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    validateFields
], login)

module.exports = router;


