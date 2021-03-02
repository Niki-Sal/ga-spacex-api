<<<<<<< HEAD
const mongoose = require('mongoose')

const config = {
    userNewURLParser: true
}
mongoose.connect('mongodb://localhost/gaSpaceX' , {
    userNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTechnology: true,
=======
const mongoose = require('mongoose');

// options (object)
// const config = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

mongoose.connect('mongodb://localhost/gaSpaceX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
>>>>>>> d80a148f58f87399c183d479e75d7b59ffaafd5b
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => {
<<<<<<< HEAD
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`)
})

db.on('error', (err) => {
    console.log(`=========> ERROR`)
    console.log(err)
=======
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`);
});

db.on('error', (err) => {
    console.log('======> ERROR');
    console.log(err);
>>>>>>> d80a148f58f87399c183d479e75d7b59ffaafd5b
});


module.exports = {
    Capsule: require('./capsule')
}