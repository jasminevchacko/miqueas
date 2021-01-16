import { updateStock } from '../../server/actions/items';

// @route   POST api/updateStock
// @desc    Updates an item's stock and date based on id
// @access  Public
export default async function (req, res) {
    const {id, stock} = req.body;
  return updateStock(id, stock)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
