const mongoose = require("mongoose");
const InventoryModel = mongoose.model("Inventory");

class Inventory {
    constructor(id = undefined) {
        this.products = [];
        if (id) {
            this.id = id;
        }
    }
    newProduct(name, amount, value) {
        return {
            name,
            amount,
            value
        }
    }
    addProduct(name, amount, value){
        this.products.push(this.newProduct(name, amount, value))
    }

    save(cb) {
        const inventory = new InventoryModel(this);
        inventory.save((err, inventory) => {
            cb(err, inventory);
        });
    }
}

module.exports = Inventory;