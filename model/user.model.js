import mongoose from "mongoose";

// First, drop the existing model if it exists
if (mongoose.models.User) {
  delete mongoose.models.User;
}

// Clear the existing collection
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    number: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function(v) {
          // Allow digits, +, spaces, and hyphens
          return /^\+?[\d\s-]{10,}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    // Force strict mode
    strict: true,
    // Ensure indexes are created
    autoIndex: true,
    // Add collection options
    collection: 'users'
  }
);

const User = mongoose.model("User", userSchema);

export default User;