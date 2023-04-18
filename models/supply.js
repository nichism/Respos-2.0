const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    priority: {
        type: Boolean,
        required: true
    },
    date_prioritized: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Supply', supplySchema);