const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
 name: String,
 occupation: String,
 catchPhrase: String,
 provider: {type: Schema.Types.ObjectID, ref: "Provider"},

 
})

const Service = mongoose.model('Service', serviceSchema );

module.exports = Service;