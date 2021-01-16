import { getName } from '../../server/actions/items';

// @route   POST api/getItemName
// @desc    Gets An Item's Name based on id
// @access  Public
export default async function (req, res) {
    const {id} = req.body;
  return getName(id)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
