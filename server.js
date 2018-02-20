const express = require('express');
const mongoose = require('mongoose');
const { db_connect } = require('./config');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

mongoose.connect(db_connect).then( () => {
    console.log('Connected to Mongo DB');
}).catch( err => {
    console.log('Error connecting to Mongo DB:', err.message);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(resolve(__dirname, 'client')));

authRoutes(app);

app.get('/test', (req, res) => {

    res.send('<h1>App working!!!</h1>');
});

app.post('/test-post', (req, res) => {
    const dataToSend = {
        message: 'Received data. Sending data back',
        received: req.body
    };

    res.send(dataToSend);
});

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server running on PORT: ' + PORT);
});
