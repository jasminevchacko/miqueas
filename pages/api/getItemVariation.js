import { getItemVariation } from '../../server/actions/items';

// @route   GET api/getItemVariation
// @desc    Get Item Variation from name and category
// @access  Public
export default async function (req, res) {
  return getItemVariation(req.query.name)
    .then((items) => res.status(200).json({
      success: true,
      payload: items,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
