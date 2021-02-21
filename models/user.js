const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [emailValidator, 'incorrect mail format'],
  },
  password: { type: String, required: true },
});

function emailValidator(value) {
  return /^.+@.+\..+$/.test(value);
}

module.exports = mongoose.model('user', userSchema);
