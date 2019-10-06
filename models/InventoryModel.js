const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const { Schema } = mongoose;

const InventorySchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Users'},
    products: [{ name: String, amount: Number, value: Number}],
})

mongoose.model('Inventory', InventorySchema)


