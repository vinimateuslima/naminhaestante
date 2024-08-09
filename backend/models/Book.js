const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    googleBookId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    pageCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
