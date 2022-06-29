
const mongoose = require("mongoose") 
//CATEGORY MODEL 
const categorySchema = new mongoose.Schema({
    name: { type: String },
});


module.exports = mongoose.model("Category", categorySchema);