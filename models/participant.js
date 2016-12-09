var mongoose = require('mongoose')

var Schema = mongoose.Schema

var participantSchema = new Schema ({
  email: String,
  password: String
})

module.exports = mongoose.model('Participant', participantSchema)
