module.exports = app => {
    const router = require("express").Router();

    const firebaseAuthController = require('../controllers/firebase.controller');

    router.post('/register', firebaseAuthController.registerUser);
    router.post('/login', firebaseAuthController.loginUser);
    router.post('/logout', firebaseAuthController.logoutUser);
    router.post('/reset-password', firebaseAuthController.resetPassword);

    app.use('/api/auth', router); 
}