const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const capsuleSchema = new Schema({
    serial: { type: String, unique: true },
    type: String,
    waterLandings: Number,
    date: new Date()
});

// Model
const Capsule = mongoose.model('Capsule', capsuleSchema);

module.exports = Capsule;