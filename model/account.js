const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: String,
    displayName: String,
    role: String,
    tenantId: String
});

module.exports = mongoose.model('Account', accountSchema);