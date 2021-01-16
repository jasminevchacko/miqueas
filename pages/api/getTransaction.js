import { getTransaction } from '../../server/actions/transactions';

// @route   POST api/getTransaction
// @desc    Gets A Specific Transaction
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
