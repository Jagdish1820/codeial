const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user_controller');

router.get('/profile', UserController.profile);

router.get('/sign-up', UserController.signUp)
router.get('/sign-in', UserController.signIn)

module.exports = router;
