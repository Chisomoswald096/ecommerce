
const mongoose = require("mongoose")
//USER MODEL
const favouriteSchema = new mongoose.Schema({
    name: { type: String },
    state: { type: String },
    age: { type: Number }
});


module.exports = mongoose.model("Favourite", favouriteSchema);