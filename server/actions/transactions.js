import mongoDB from '../index';
import Item from '../../models/Item';
import TransactionItem from '../../models/TransactionItem';
import Transaction from '../../models/Transaction';
import {getItemUpdateStock, updateStock} from './items.js';
import {forEach} from 'react-bootstrap/cjs/ElementChildren';

export async function getTransactions() {
  await mongoDB();

  return Transaction.find().sort({ submitted: -1 });
}

export async function addTransaction(transaction) {
  await mongoDB();
  let transItems = transaction.transactionItems;
  for (let i = 0; i < transItems.length; i++) {
    let item = await getItemUpdateStock(transItems[i].item.name, transItems[i].item.category,
      transItems[i].item.gender, transItems[i].item.typeColor, transItems[i].item.size, transItems[i].item.location, transItems[i].quantityChanged);
    transItems[i].item = item._id;
    let newTransItem = await TransactionItem.create(transItems[i]);
    transItems[i] = newTransItem._id;
  }
  return Transaction.create(transaction);
}

export async function getTransaction(id) {
  await mongoDB();

  return Transaction.findById(id);
}

export async function deleteTransaction(id) {
  await mongoDB();

  await Transaction.findById(id).then((item) => item.remove());
}

export async function deleteTransactionItem(itemId, transactionId) {
  await mongoDB();

  await TransactionItem.findById(itemId).then((item) => {
    Item.findById(item.item).then((it) => {
      it.stock = it.stock - item.quantityChanged;
      it.save();
      item.remove();
    });
  });
  let transaction = await Transaction.findById(transactionId);
  let transItems = transaction.transactionItems;
  transItems.forEach((id, i) => {
    if (id == itemId) {
      transItems.splice(i,1);
    }
  });
  if (transItems.length == 0) {
    await Transaction.findById(transactionId).then((item) => item.remove());
  }
  return Transaction.findOneAndUpdate({_id: transactionId}, transaction);
}

export async function updateTransactionItem(itemId, newTransaction) {
  await mongoDB();

  let itemRef = {};

  await Item.findOne({name:newTransaction.item.name, category: newTransaction.item.category,
              gender: newTransaction.item.gender, typeColor: newTransaction.item.typeColor,
              size: newTransaction.item.size, location: newTransaction.item.location},
        function(err, item) {
          if(err) {
            let newItem = Item.create({ name: newTransaction.item.name, category: newTransaction.item.category,
              gender: newTransaction.item.gender, typeColor: newTransaction.item.typeColor,
              size: newTransaction.item.size, location: newTransaction.item.location,
              stock: newTransaction.quantityChanged, reorder_level: 0});
            itemRef = newItem._id;
          } else {
            item.stock = (item.stock) + newTransaction.quantityChanged;
            item.save();
            itemRef = item._id;
          }
        });

  await TransactionItem.findById(itemId).then((item) => {
    Item.findById(item.item).then((it) => {
      it.stock = it.stock - item.quantityChanged;
      it.save();
      item.quantityChanged = newTransaction.quantityChanged;
      item.item = itemRef;
      item.save();
    });
  });
}
