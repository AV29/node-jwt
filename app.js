const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use((req, res, next) => {
    console.log('Request got from: ', req.url);
    next();
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', (req, res) => {
    res.json({
        message: 'Post created...'
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    jwt.sign();
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});