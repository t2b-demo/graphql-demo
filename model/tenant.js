const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
    name: String,
    accountId: String
});

module.exports = mongoose.model('Tenant', tenantSchema);