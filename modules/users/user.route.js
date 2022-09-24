const express = require('express');
const router = express.Router();
const usercontroller=require('./user.controller')

router.post('/signup',usercontroller.signup);
router.post('/login',usercontroller.login);
router.get('/getbanner',usercontroller.Banner);
module.exports = router;