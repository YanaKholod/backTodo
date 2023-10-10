const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { emailRegexp } = require("../constants/validation");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => emailRegexp.test(value),
        message: "Invalid email format",
      },
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    token: { type: String, default: "" },
    role: { type: String, default: "user" },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
