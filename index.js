const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const i18n = require('i18n-express');
const { connectWithRetry: dbconnection } = require('./db/connection');

const app = express();
app.use(
    i18n({
        translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
        siteLangs: ['es', 'en', 'de', 'ru', 'it', 'fr'],
        textsVarName: 'translation',
    }),
);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.get('/', (req, res) => {
    res.locals = {
        title: 'Dashboard',
    };
    res.render('Dashboard/index');
});

const port = process.env.PORT || 8000;
dbconnection();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
