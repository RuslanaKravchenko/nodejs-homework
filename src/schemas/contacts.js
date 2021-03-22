const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, "Name contact is required"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\+38|7|8)?[\s-]?\(?[0][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      // match: /^(\+38|7|8)?[\s-]?\(?[0][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
      unique: true,
      required: [true, "User phone number required"],
    },
    email: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
