const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/whats_your_tunage');

module.exports = mongoose.connection;
