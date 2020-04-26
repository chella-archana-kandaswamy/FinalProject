const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const inkRecognizer = require('./controller/inkRecognizer');
const login = require('./controller/login');
const register = require('./controller/register');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://ckandasw:Guruman@netflixcluster-hurmw.mongodb.net/cognitive_services?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

app.use('/register',register);
app.use('/login',login);
app.use('/inkrecognizer',inkRecognizer);

app.listen(port, () => console.log("App listening on port",port));