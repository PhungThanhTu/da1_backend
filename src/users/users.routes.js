const express = require('express');

const router = express.Router();


const {isAuth} = require('../auth/auth.middleware');

router.get('/profile',isAuth,async (req,res) =>{
    res.send(req.user);
})

module.exports = router;