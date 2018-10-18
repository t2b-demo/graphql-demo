const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: String,
    ordinal: Number,
    soaId: String,
    armId: String
});

module.exports = mongoose.model('Activity', activitySchema);