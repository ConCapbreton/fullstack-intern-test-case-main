const mongoose = require("mongoose");

const questionSchema = require("./question-schema");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String, 
      require: true,
      index: true,
      immutable: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 256,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = courseSchema;
