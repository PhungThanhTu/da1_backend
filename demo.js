const demoObject = require('./src/users/users.model');
const mongoose = require('mongoose');
const {con_string} = require('./config/mongo');

mongoose.connect(con_string);

demoObject.updateToken("pttu2001","hasagiii");