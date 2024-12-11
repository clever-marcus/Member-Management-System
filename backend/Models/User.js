const mongoose = require("mongoose");


const userSchema = new mongoose.Schema ({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "client"], default: "client" }
});

module.exports = mongoose.model("User", userSchema)