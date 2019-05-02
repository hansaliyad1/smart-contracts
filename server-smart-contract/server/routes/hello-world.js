const helloworld = require("../controllers").helloworld;

module.exports = (router) => {

    router.post('/helloworld', helloworld.test);

    return router;

};
