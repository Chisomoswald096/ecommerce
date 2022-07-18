
const mongoose = require("mongoose") 
//ORDER MODEL 
const orderSchema = new mongoose.Schema({
    address: { type: String },
    city: { type: String },
    state: { type: String },
    number: { type: String },
    items: { type: Array },


});


module.exports = mongoose.model("Order", orderSchema);