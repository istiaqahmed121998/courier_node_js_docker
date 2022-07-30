const express = require('express');

const router = express.Router();

const usersRoute = require('./User');

module.exports = (params) => {
    router.get('/', (req, res) => {
        res.locals = { title: 'Dashboard' };
        res.render('Dashboard/index');
    });
    router.use('/user', usersRoute(params.userService));

    return router;
};
