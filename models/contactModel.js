// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model, define collection name here
var Contact = module.exports = mongoose.model('contact', contactSchema, 'contactCollection');
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}