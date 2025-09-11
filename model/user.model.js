import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    number: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function(v) {
          return /^\+?[\d\s-]{10,}$/.test(v); // Validates phone numbers with optional + and at least 10 digits
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;