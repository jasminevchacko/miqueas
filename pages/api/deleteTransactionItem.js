import { deleteTransactionItem } from '../../server/actions/transactions';

// @route   POST api/getTransaction
// @desc    Gets A Specific Transaction
// @access  Public
export default async function (req, res) {
  const {itemId, transactionId} = req.body;
  return deleteTransactionItem(itemId, transactionId)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
