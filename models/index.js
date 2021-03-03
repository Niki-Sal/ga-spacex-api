const mongoose = require('mongoose');

// config for mongoose
const mongooseConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect('mongodb://localhost/gaSpaceX', mongooseConfig);

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`);
});

db.on('error', (err) => {
    console.log('======> ERROR');
    console.log(err);
});

module.exports = {
    Capsule: require('./capsule'),
    Starlink: require('./starlink'),
    Crew: require('./crew'),
    Rocket: require('./rocket')
}