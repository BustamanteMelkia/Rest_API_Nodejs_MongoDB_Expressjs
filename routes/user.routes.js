const router = require('express').Router();
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controller');
const validateFields = require('../middlewares/validate-fields');
const { isValidRole, existEmail, existUserId } = require('../helpers/db-validators'); 



router.get('/', userGet);

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( existEmail ),
    check('role').custom( isValidRole),
    // check('role', 'Role not exist').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateFields
], userPost);

router.put('/:id',[
    check('id', 'Invalid id').isMongoId(),
    check('id').custom( existUserId ),
    check('role').custom( isValidRole ),
    validateFields
], userPut);
router.delete('/', userDelete);

module.exports = router;