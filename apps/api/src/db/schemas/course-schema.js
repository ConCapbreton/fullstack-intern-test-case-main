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
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Question",
        default: [],
    },
    description: {
      type: String,
      required: true,
      maxLength: 256,
    },
  },
  { timestamps: true }
);

module.exports = courseSchema;
