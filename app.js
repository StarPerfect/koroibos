var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var indexRouter = require('./routes/index');
var olympianRouter = require('./routes/api/v1/olympians');
var statsRouter = require('./routes/api/v1/stats');
var eventsRouter = require('./routes/api/v1/events');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/olympians', olympianRouter);
app.use('/api/v1/olympian_stats', statsRouter);
app.use('/api/v1/events', eventsRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 4000, () => {
        console.log("Listening for requests on port 4000")
    });
};

module.exports = app;
