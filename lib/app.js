const express = require('express');
const app = express();
require('./models/register-plugins');

//Middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
//Poke it with a stick
app.get('/hello', (req, res) => res.send('hellloooo, you alive in there? What you got thats worth living for?'));
//check connect
app.use(checkConnection);

//API routes
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const reviewers = require('./routes/reviewers');
const films = require('./routes/films');
app.use('/api/studios', studios);
app.use('/api/actors', actors);
app.use('/api/reviewers', reviewers);
app.use('/api/films', films);

//Not Found 404's 
const api404 = require('./middleware/api-404');
app.use('/api', api404);
//ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);



module.exports = app;