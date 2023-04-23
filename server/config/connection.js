const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/whats_your_tunage');

module.exports = mongoose.connection;
