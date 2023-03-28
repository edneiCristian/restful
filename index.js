const express = require('express');
const routes = require('./routes/index');

let routesIndex = require('./routes/index');
let routesUsers = require('./routes/users');

let app = express();

app.use(routesIndex);
app.use('/users' ,routesUsers);

app.listen(3000, '127.0.0.1', () => {

    console.log('servidor rodando!');

});

