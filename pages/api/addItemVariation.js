import { addItemVariation } from '../../server/actions/itemVariation';

export default async function (req, res) {
  ("body:",req.body);
  const { itemVariation } = req.body;
  ("itemVar", itemVariation);
  return addItemVariation(itemVariation)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}