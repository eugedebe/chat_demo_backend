const { Schema, model } = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

userSchema.method('toJSON', function () {
    const { __v, password, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;

})

module.exports = model('User', userSchema);