const mongoose = require('mongoose');
const uuid4 = require('uuid4');
const schema = mongoose.Schema;


const userSchema = new schema({
    username: {
        type: String,
        required: true,
        min: 6,
    },

    email: { 
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255,

    },

    qr_id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true,
    },

    validated: {
        type: Boolean,
        default: false,
    },
    

});


module.exports = mongoose.model('User', userSchema);