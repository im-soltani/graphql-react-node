const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  
  {
 
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
   
  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)