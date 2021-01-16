const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionItemSchema = new Schema({
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    recipient: {
      type: String,
      required: true
    },
    quantityChanged: {
      type: Number,
      required: true,
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    expiration_date: {
      type: Number,
      required: false,
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    }
});


module.exports = (mongoose.models && mongoose.models.TransactionItem) ?
                  mongoose.models.TransactionItem :
                  mongoose.model('TransactionItem', TransactionItemSchema);
