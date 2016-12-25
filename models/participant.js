var mongoose = require('mongoose')

var Schema = mongoose.Schema

var participantSchema = new Schema ({
  email: String,
  password: String,
  registered: Date,
  isActive: Boolean
})

module.exports = mongoose.model('Participant', participantSchema)
