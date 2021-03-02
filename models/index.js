const mongoose = require('mongoose')

const config = {
    userNewURLParser: true
}
mongoose.connect('mongodb://localhost/gaSpaceX' , {
    userNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTechnology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`)
})

db.on('error', (err) => {
    console.log(`=========> ERROR`)
    console.log(err)
});


module.exports = {
    Capsule: require('./capsule')
}