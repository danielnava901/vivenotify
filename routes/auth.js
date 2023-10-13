const express = require('express');
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;

// Configuración de Passport
passport.use(new LocalStrategy(
    function(username, password, done) {

        // Aquí debes implementar la lógica de autenticación con tus propias reglas
        if (username === 'dnv' && password === 'viveros') {
            return done(null, { id: 1, username });
        } else {
            return done(null, false, { message: 'Credenciales incorrectas' });
        }
    }
));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get('/login', (req,
                      res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureMessage: true,
    })
);

router.all('/logout', function(req,
                               res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports =  router;