const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {type: String, required:false, unique: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    fechaNac: { type: String, required: false, trim: true},
    rol: {type: String, enum: ["admin", "user"], default: "user"}
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function (next) {

    this.password = bcrypt.hashSync(this.password, 10);
    next();

})

const User = mongoose.model('users', userSchema);
module.exports = User;