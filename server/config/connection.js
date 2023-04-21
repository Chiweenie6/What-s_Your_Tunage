const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/whats_your_tunage',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = mongoose.connection;
