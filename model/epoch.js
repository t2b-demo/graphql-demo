const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const epochSchema = new Schema({
    parentId: String,
    name: String,
    ordinal: String,
    isFixedAsEarliest: Boolean,
    soaId: String
});

module.exports = mongoose.model('Epoch', epochSchema);