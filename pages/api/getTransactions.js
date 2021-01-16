import { getTransactions } from '../../server/actions/transactions';

// @route   POST api/getTransaction
// @desc    Gets All Transactions
// @access  Public
export default async function (req, res) {
  return getTransactions()
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
