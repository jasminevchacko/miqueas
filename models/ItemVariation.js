const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemVariationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  gender: {
    type: [String],
  },
  size: {
    type: [String],
  },
  typeColor: {
    type: [String],
  },
});

export default (mongoose.models && mongoose.models.ItemVariation) ? mongoose.models.ItemVariation :
  mongoose.model('ItemVariation', ItemVariationSchema);
