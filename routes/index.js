
let express =require('express');
let routes = express.Router();

routes.get('/', (req, res) => {

    res.statusCode = 200;
    // res.setDefaultEncoding('utf8');
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá</h1>');
    F
});

module.exports = routes;