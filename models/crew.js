const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a crewSchema
const crewSchema = new Schema({
    id: { type: String, unique: true },
    name: String,
    agency: String,
    image: String,
    wikipedia: String,
    status: String
});

// Model
const Crew = mongoose.model('Crew', crewSchema);

module.exports = Crew;