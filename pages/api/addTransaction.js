import { addTransaction } from '../../server/actions/transactions';

// @route   POST api/addItem
// @desc    Create A Transaction
// @access  Public
export default async function (req, res) {
  const { transaction } = req.body;
  return addTransaction(transaction)
    .then((result) => res.status(200).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
