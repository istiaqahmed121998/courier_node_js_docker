const express = require('express');

const router = express.Router();

module.exports = (userService) => {
    router.get('/', async (req, res, next) => {
        try {
            const user = await userService.getUser();
            return res.send(user);
        } catch (err) {
            return next(err);
        }
    });
    return router;
};
