const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const path = require('path');
require('colors')

app.use(cors())

// Middleware
app.use(bodyParser.json());

// database
mongoose.connect('mongodb+srv://pradev12:pradev12@camioncluster.chsxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB'.cyan.underline);
})


const publicDir = path.join(__dirname, '../frontend')

// Routes\
app.use(express.static(publicDir));


app.get("/", (req, res) => {
  // res.sendFile('index.html')
  res.send("hello")
})


const productRoute = require('./routes/Products');

app.use('/products', productRoute);

app.listen(8000, console.log("Listening on port 8000".underline.magenta))