const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const i18n = require('i18n-express');
// const { connectWithRetry: dbconnection } = require('./db/connection');
const UserService = require('./services/UserService');
const routes = require('./routes');

const app = express();

module.exports = (config) => {
    const log = config.log();
    if (app.get('env') === 'development') {
        app.use((req, res, next) => {
            log.debug(`${req.method}: ${req.url}`);
            return next();
        });
    }
    const userService = new UserService();

    /* Setting up the i18n-express middleware. */
    app.use(
        i18n({
            translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
            siteLangs: ['es', 'en', 'de', 'ru', 'it', 'fr'],
            textsVarName: 'translation',
        }),
    );
    /* Serving static files from the public folder. */
    app.use('/public', express.static(path.join(__dirname, 'public')));

    /* Limiting the size of the request body to 1kb. */
    app.use(
        express.urlencoded({
            extended: true,
            limit: '1kb',
        }),
    );
    /* Limiting the size of the request body to 1kb. */
    app.use(express.json({ limit: '1kb' }));

    /* Setting the path to the views folder. */

    app.set('views', path.join(__dirname, 'views'));
    /* Setting up the view engine to ejs and using express layouts. */
    app.set('view engine', 'ejs');
    app.use(expressLayouts);

    app.use('/', routes({ userService }));

    return app;
};
