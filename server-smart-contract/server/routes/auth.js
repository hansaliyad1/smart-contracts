const jwt       = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config    = require('../../bin/config/config');

module.exports = {

    ensureAuthorized(req, res, next) {
        const token = req.headers['authorization']; // Create token found in headers
        // Check if token was found in headers
        if (!token) {
            res.json({ success: false, message: 'No token provided' }); // Return error
        } else {
            // Verify the token is valid
            jwt.verify(token, config.secret, (err, decoded) => {
                // Check if error is expired or invalid
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    }

};
