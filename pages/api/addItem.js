import { addItem } from '../../server/actions/items';

// @route   POST api/addItem
// @desc    Create An Item
// @access  Public
export default async function (req, res) {
  const { item } = req.body;
  return addItem(item)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}