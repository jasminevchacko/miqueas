import { getCategories } from '../../server/actions/itemVariation';

// @route   GET api/getItems
// @desc    Get All Items
// @access  Public
export default async function (req, res) {
  return getCategories()
    .then((items) => res.status(200).json({
      success: true,
      payload: items,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}