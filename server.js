const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req,res) => res.send('Hello'));

// db connect
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db)
        .then(() => console.log('MongoDB connected successfully'))
        .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));