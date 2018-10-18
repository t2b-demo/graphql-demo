const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soaSchema = new Schema({
    name: String,
    tag: String,
    protocolVersionId: String
});

module.exports = mongoose.model('Soa', soaSchema);