const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng nhập
//[POST] localhost:3000/api/user/v1/login
router.post('/login', userController.login)

// Đăng ký
//[POST] localhost:3000/api/user/v1/register
router.post('/', userController.createUsers)

module.exports = router;