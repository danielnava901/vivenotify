const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const bodyParser = require('body-parser');
require('dotenv').config();


const dev = process.env.NODE_ENV !== 'production'
console.log("inti: ",dev, process.env.NODE_ENV);

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mi-secreto', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session({
    secret: 'unodostresportodosmisamigos', // Cambia esto a tu secreto
    resave: false,
    saveUninitialized: false,
}));
app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
});
app.use(flash());

/********************** Configuración de las vistas **************/
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/********************** RUTAS ***********************************/
const dashboardRouter = require('./routes/dashboard');
const dashboardReportsRouter = require('./routes/dashboard/reports');
const authRouter = require('./routes/auth');
const clientRouter = require('./routes');



app.use('/dashboard', dashboardRouter);
app.use('/dashboard/reports', dashboardReportsRouter);
app.use('/', clientRouter);
app.use('/', authRouter);

/************************ FIN RUTAS ******************************/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`App en puerto: ${process.env.PORT || 3000}`);
});
