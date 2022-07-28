const express = require('express');
const path = require('path');
const { connectWithRetry: dbconnection } = require('./db/connection');

const app = express();
const port = process.env.PORT || 8000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello World! ');
});

app.set('view engine', 'ejs');

dbconnection();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
