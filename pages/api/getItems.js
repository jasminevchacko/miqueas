
import { getItems } from '../../server/actions/items';

// @route   GET api/getItems
// @desc    Get All Items
// @access  Public
export default async function (req, res) {
  return getItems()
    .then((items) => res.status(200).json({
      success: true,
      payload: items,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}