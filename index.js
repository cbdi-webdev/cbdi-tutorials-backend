require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

// parsing middlewares & cors
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

// main routes

     // users
     const userRoutes = require('./routes/userRoutes.js');
     app.use('/users', userRoutes);

// mongoDB connection
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Successfully connected to MongoDB Database'));



// port listen
app.listen(port, () => {
     console.log(`Listening to requests at port ${port}`);
});

