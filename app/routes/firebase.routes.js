module.exports = app => {
    const router = require("express").Router();

    const firebaseAuthController = require('../controllers/firebase.controller');

    router.get('/isLoggedIn', firebaseAuthController.isLoggedIn);

    app.use('/api/auth', router); 
}