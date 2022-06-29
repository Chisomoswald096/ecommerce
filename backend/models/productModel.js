
const mongoose = require("mongoose") 
//USER MODEL 
const productSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    price: { type: String },
    categoryId: { type: String },

});


module.exports = mongoose.model("Product", productSchema);