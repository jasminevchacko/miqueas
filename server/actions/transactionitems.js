import mongoDB from '../index';
import TransactionItem from '../../models/TransactionItem';

export async function getItem(id) {
  await mongoDB();

  return TransactionItem.findById(id);
}