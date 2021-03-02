const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roadsterSchema = new Schema({
    name: String,
    orbit_type: String,
    id: {type: String, unique: true},
    earth_distance_km: Number;


});


const Roadster = 
mongoose.model('Roadster', roadsterSchema);

module.exports = Roadster;