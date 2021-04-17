const router = require('express').Router();

const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controller');

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);

module.exports = router;