const mongoose = require("mongoose");
const FinalModel = mongoose.model("Final");
var generator = require('generate-serial-number');

class Final {
    constructor(name, id, blocks) {
        this.name = name;
        this.serial = generator.generate(5)
        this.manufacturer = id;
        this.blocks=blocks;
    }

    save(cb) {
        const final = new FinalModel(this);
        final.save((err, final) => {
            cb(err, final);
        });
    }

    // save(cb) {

    //     const block = new BlockModel(this)

    //     block.save((err, block) => {
    //         cb(err, block)
    //     })

    // }
}

module.exports = Final;
