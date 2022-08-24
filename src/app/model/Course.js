const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require("mongoose-slug-generator");

const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
  {
    _id: Number,
    name: { type: String, required: true },
    description: String,
    image: String,
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, required: true },
    level: String,
  },
  {
    _id: false,
    timestamps: true,
  }
);

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
