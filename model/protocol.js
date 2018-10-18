const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const protocolSchema = new Schema({
    name: String,
    number: String,
    tag: String,
    tenantId: String
});

module.exports = mongoose.model('Protocol', protocolSchema);