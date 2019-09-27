const mongoose= require ('mongoose')
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    name : String,
    director:String,
    service: {type: Schema.Types.ObjectID, ref: "Service"},
    website: String,
    description: String,
    phonenumber: String,
})

const Provider = mongoose.model ('Provider', providerSchema);

module.exports = Provider;