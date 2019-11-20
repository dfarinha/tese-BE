const mongoose = require('mongoose');
const { Schema } = mongoose;


const FinalSchema = new Schema({
    name: String,
    serial: String,
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Users'},
    blocks: [{ type: Schema.Types.ObjectId, ref: 'Block'}]
})


mongoose.model('Final', FinalSchema)