const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const companySchema = new Schema({
    name: String,
    company: String,
    employees: Number,
});

// Model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;