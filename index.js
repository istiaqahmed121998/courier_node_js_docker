const express = require('express');

const { connectWithRetry: dbconnection } = require('./db/connection');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World! ');
});

dbconnection();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
