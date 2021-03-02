const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Make a capsuleschema
const capsuleSchema = new Schema({
    serial: String,
    type: String,
    waterLandings: Number
})


const Capsule = mongoose.model('Capsule', capsuleSchema)

module.exports = Capsule;