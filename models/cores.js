const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a coreSchema
const coreSchema = new Schema({
    serial: { type: String, unique: true },
    status: String,
    lastUpdate: String,
});

// Model
const Core = mongoose.model('Core', coreSchema);

module.exports = Core;