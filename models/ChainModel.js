const mongoose = require('mongoose');
const Block = mongoose.model('Block');
const Users = mongoose.model('Users');
const { Schema } = mongoose;


const ChainsSchema = new Schema({
    blocks: [{ type: Schema.Types.ObjectId, ref: 'Block'}],
    owner: { type: Schema.Types.ObjectId, ref: 'Users'}
})


mongoose.model('Chain', ChainsSchema)


