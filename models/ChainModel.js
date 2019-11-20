const mongoose = require('mongoose');
const Block = mongoose.model('Block');
const Users = mongoose.model('Users');
const { Schema } = mongoose;


const ChainsSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Users'},
    blocks: [{ type: Schema.Types.ObjectId, ref: 'Block'}]
})


mongoose.model('Chain', ChainsSchema)


