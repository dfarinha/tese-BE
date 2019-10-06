const mongoose = require('mongoose');
const InventoryModel = mongoose.model('Inventory');

class Inventory {
    constructor(id) {
        this.id = id
        this.products = []
    }

    newProduct(name, amount, value) {
        this.name = name;
        this.amount = amount;
        this.value = value
    }

    save(cb) {
        const inventory = new InventoryModel(this)
        inventory.save((err, inventory) => {
            cb(err, inventory)
        })
    }
}

module.exports = Inventory;