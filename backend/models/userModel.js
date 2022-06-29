const mongoose = require("mongoose")
//USER MODEL
const userSchema = new mongoose.Schema({
    email: { type: String },
    userName: { type: String },
    password: { type: String },
    isAdmin:{type:Boolean, default:false}
});


const User = mongoose.model("User", userSchema);
module.exports = User