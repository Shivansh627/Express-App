const mongoose = require("mongoose");



const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add contact Full name "],
    },
    email: {
      type: String,
      required: [true, "Please add contact email "],
    },
    phone: {
      type: String,
      required: [true, "Please add contact Phone Number "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("Contact",contactSchema);