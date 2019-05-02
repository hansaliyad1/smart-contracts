const auth              = require('./auth');
const userController    = require("../controllers").user;

module.exports = (router) => {
    /* ==============
       Register Route
    ============== */
    router.post('/register', userController.register);

    /* ============================================================
       Route to check if user's email is available for registration
    ============================================================ */
    router.get('/checkEmail/:email', userController.checkEmail);

    /* ===============================================================
       Route to check if user's username is available for registration
    =============================================================== */
    router.get('/checkUsername/:username', userController.checkUsername);

    /* ========
    LOGIN ROUTE
    ======== */
    router.post('/login', userController.login);

    /* ===============================================================
       Route to get user's profile data
    =============================================================== */
    router.get('/profile', auth.ensureAuthorized, userController.profile);
    
    router.post('/create-keys', auth.ensureAuthorized, userController.createKeys);

    return router; // Return router object to main index.js
}
