const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use((req, res, next) => {
    console.log('Request got from: ', req.url);
    next();
});

app.use(verifyToken);

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'Anton',
        email: 'snumber29@gmail.com'
    };
    jwt.sign({ user }, 'secret_key', (err, token) => {
        res.json({ token });
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {

    res.json({
        message: 'Post created...',
        authData1: req.authData
    });
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});

//Format of token: Authorization: Bearer <access_token>

function verifyToken (req, res, next) {

    if (req.url === '/api/login') {
        next('route');
    } else {

        // Get auth header value

        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            //set token
            jwt.verify(bearerHeader.split(' ')[1], 'secret_key', (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    req.authData = authData;
                    next();
                }
            });
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }

}