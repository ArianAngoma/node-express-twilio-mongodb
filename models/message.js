const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    msg: {
        type: String,
        required: true
    },
    from: {
        type: String
    },
    to: {
        type: String
    }
})

module.exports = model('Message', MessageSchema);