"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const mongoosePaginate = require("mongoose-paginate");

mongoosePaginate.paginate.options = {
  limit: 3, // how many records on each page
};

const PetSchema = new Schema(
  {
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    species: { type: String, required: true },
    favoriteFood: { type: String, required: true },
    description: { type: String, required: true, minlength: 40 },
    avatarUrl: { type: String, required: true },
    picUrl: { type: String },
    picUrlSq: { type: String },
    price: { type: Number },
    purchasedAt: { type: String },
  },
  {
    timestamps: true,
  }
);

PetSchema.plugin(mongoosePaginate);

// without weights
// PetSchema.index({ name: 'text', species: 'text', favoriteFood: 'text', description: 'text' });

// with weights
PetSchema.index(
  { name: "text", species: "text", favoriteFood: "text", description: "text" },
  { name: "My text index", weights: { name: 10, species: 4, favoriteFood: 2, description: 1 } }
);

module.exports = mongoose.model("Pet", PetSchema);
