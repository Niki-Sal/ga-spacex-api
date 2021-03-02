<<<<<<< HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Make a capsuleschema
const capsuleSchema = new Schema({
    serial: String,
    type: String,
    waterLandings: Number
})


const Capsule = mongoose.model('Capsule', capsuleSchema)
=======
const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const capsuleSchema = new Schema({
    serial: { type: String, unique: true },
    type: String,
    waterLandings: Number,
});

// Model
const Capsule = mongoose.model('Capsule', capsuleSchema);
>>>>>>> d80a148f58f87399c183d479e75d7b59ffaafd5b

module.exports = Capsule;