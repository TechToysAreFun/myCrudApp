const path = require('path');
const express = require('express');

// Create router and export it at EOF
const router = express.Router();

// Import middleware
const userController = require('../controllers/userController');

router.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/index.html'));
})

router.post("/",
    userController.login,
    userController.setCookie,
    (req, res) => {
        console.log('Inside of POST /');
        console.log('res.locals.user: ', res.locals.user);
        // res.status(200).json(res.locals.user);
        res.redirect("/home");
    });

router.get("/home", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "../../client/home.html"));
})

router.get('/signup', (req, res) => {
    console.log('Inside of GET /signup route');
    res.status(200).sendFile(path.resolve(__dirname, '../../client/signup.html'));
})

router.post("/signup",
    userController.signup,
    userController.setCookie,
    (req, res) => {
        console.log('Inside of /signup route');
        res.redirect('/home');
    });


module.exports = router;