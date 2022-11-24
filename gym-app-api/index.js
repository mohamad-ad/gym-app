const express = require('express');
const exercises = require('./routes/exercises');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const error = require('./middleware/error')
const cors = require('cors')


mongoose.connect('mongodb://localhost/gym-app-db').then(()=>console.log('connected to database'))


const app = express();
app.use(express.json());
app.use(cors());
app.use('/exercises',exercises);
app.use('/users', users);
app.use('/auth', auth);
app.use(error)


app.listen(4000, ()=>console.log("on port 4000"))