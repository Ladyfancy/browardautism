const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
 name: String,
 date: String,
 time: String,
 location: String,
 price: Number,
 organizer: {type: Schema.Types.ObjectId, ref: "Provider"}
})

const Event = mongoose.model('Event', eventSchema );

module.exports = Event;