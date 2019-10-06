const mongoose = require('mongoose');
const ChainModel = mongoose.model('Chain');


class Chain {
    constructor(id) {
        this.blocks = []
        this.id = id
    }
    addBlock(block) {
        this.blocks.push(block)
    }
    getLatestBlock() {
        return this.blocks[this.blocks.length - 1];
    }
    getAllBlocks() {
        for (let i = 0; i < this.blocks.length; i++) {
            const element = this.blocks[i];
            console.log(element);
        }
    }
    getChainById(id) {
        return chain.filter(chain => chain.id == id);
    }
    returnLastHash() {
        return this.blocks[this.blocks.length - 1].prevHash;
    }
    save(cb) {
        const chain = new ChainModel(this)
        chain.save((err, chain) => {
            cb(err, chain)
        })

    }
}
module.exports = Chain;