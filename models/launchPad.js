const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const launchpadSchema = new Schema({
    name: { type: String },
    region: String,
    latitude: Number,
    longitude: Number
})

const Launchpad = mongoose.model('Launchpad', launchpadSchema);

module.exports = Launchpad;