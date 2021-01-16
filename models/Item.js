const mongoose = require('mongoose');

const {Schema} = mongoose;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stock: { // amount of item currently in the inventory
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: { // boy/girl
    type: String,
    required: false,
  },
  typeColor: { // type/color
    type: String,
    required: false,
  },
  size: { // small, large, etc.
    type: String,
    required: false,
  },
  location: { // downstairs, bodega, closet, etc.
    type: String,
    required: true,
  },
  reorder_level: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  lastUpdated: { type: Date, default: Date.now }
});

export default (mongoose.models && mongoose.models.Item) ?
  mongoose.models.Item : mongoose.model('Item', ItemSchema);
