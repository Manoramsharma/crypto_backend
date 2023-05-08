const mongoose = require('mongoose');
const l = require('../common/logger');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  l.info(`mongodb connected`);
};

module.exports = connectDB;
