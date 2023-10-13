const express = require('express');
const router = express.Router();

router.get('/', (req,
                 res) => {
    //if (req.isAuthenticated()) {
    if (true) {
        res.render('dashboard', { user: req.user });
    } else {
        res.redirect('/login');
    }
});

module.exports =  router;