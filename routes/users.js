const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users_controller');

router.get('/profile', UserController.profile);

router.get('/sign-up', UserController.signUp)
router.get('/sign-in', UserController.signIn)

router.post('/create', UserController.create);

module.exports = router;
