var mongoose = require('mongoose');




const Inventory = mongoose.model('Inventory',{

    vendorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    products: [{
        productName: {
            type: String,
            required: true
        },
        productId: {
            type: String, // autoGen by Us.
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        stockCnt: {
            type: Number,
            required: true
        },
        MRP: {
            type: Number
        }
    }]

},'Inventory')

module.exports = { Inventory };