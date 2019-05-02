const auth   = require('./auth');
const assets = require("../controllers").assets;

module.exports = (router) => {

    router.post('/create', auth.ensureAuthorized, assets.create);

    router.post('/create-div', auth.ensureAuthorized, assets.createDiv);

    router.post('/retrieve', auth.ensureAuthorized, assets.retrieve);

    router.get('/info/:txid', auth.ensureAuthorized, assets.info);
    
    router.post('/transfer', auth.ensureAuthorized, assets.transfer);

    return router;

};
