import { getItem } from '../../server/actions/transactionitems';

// @route   POST api/getTransactionItem
// @desc    Gets A Specific Transaction Item
// @access  Public
export default async function (req, res) {
    const {id} = req.body;
  return getItem(id)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
