const router = require('express').Router();
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controller');
const validateFields = require('../middlewares/validate-fields');

router.get('/', userGet);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('role', 'Role not exist').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
], userPost);

router.put('/:id', userPut);
router.delete('/', userDelete);

module.exports = router;