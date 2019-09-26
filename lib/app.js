const express = require('express');
const app = express();
require('./models/register-plugins');

//Middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);
//Poke it with a stick
app.get('/hello', (req, res) => res.send('hellloooo, you alive in there? What you got thats worth living for?'));




module.exports = app;