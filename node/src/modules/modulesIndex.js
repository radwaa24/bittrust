const bodyParser  =  require('body-parser');

const router = require('../routes/routesIndex');

module.exports = async (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true,}));
    app.set('trust proxy', 1);
    router(app);
    
    // Error Handler
    app.use((err, req, res, next) => {
        if(err) {
            throw (err);
        } else {
            console.log("Error handler");
            res.status(200);
        }
    });
};
