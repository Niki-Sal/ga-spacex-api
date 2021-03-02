const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

const payLoadSchema = new Schema({
    name: String,
    type: String,
    customer: String,
    nationality: String,
    mass_lbs: Number,
    orbit: String
});

const PayLoad = mongoose.model('PayLoad', payLoadSchema);

module.exports = PayLoad;