const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 6;
const { Schema } = mongoose;
const { Subscription } = require("../helpers/constants");

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      default: "Guest",
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email  is required"],
      validate: {
        validator: function (v) {
          const reg = /^\S+@\S+\.\S+/;
          return reg.test(String(v).toLowerCase());
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    password: {
      type: String,
      required: [true, "Password  is required"],
    },

    token: {
      type: String,
      default: null,
    },

    subscription: {
      type: String,
      enum: {
        values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        message: "This subscription isn't allowed",
      },
      default: Subscription.FREE,
    },
  },
  { versionKey: false, timestamps: true }
);

//? Альтернативный вариант валидации:
// userSchema.path("email").validate(function (value) {
//   const reg = /^\S+@\S+\.\S+/;
//   return reg.test(String(value).toLowerCase());
// });

// Шифруем пароль перед сохранением:
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

//? или:
// userSchema.methods.setPassword = async function (password) {
//   thus.password = await bcrypt.hashSync(
//     password,
//     bcrypt.genSaltSync(SALT_FACTOR)
//   );
// };

// Валидация пароля:
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
