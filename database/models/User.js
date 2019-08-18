const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  // Get the User
  const user = this

  // Encrypt the password
  bcrypt.hash(user.password, 10, function (error, encrypted) {
    // Change Password unencrypted to encrypted 
    user.password = encrypted

    next()
  })
})

module.exports = mongoose.model('User', UserSchema)