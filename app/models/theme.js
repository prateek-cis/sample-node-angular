var mongoose = require('mongoose');

module.exports = mongoose.model('Themes', {
    themeName: {
        type: String,
        default: ''
    },
    font: {
        type: String,
        default: ''
    },
    fontNo: {
        type: String,
        default: ''
    }
});