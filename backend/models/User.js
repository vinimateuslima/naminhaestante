const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBookSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["Lendo", "Quero Ler", "Lido"],
      default: "Quero Ler",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    review: String,
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    books: [userBookSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);