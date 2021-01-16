import searchFunction from '../../server/actions/searchfunction';
export default async function(req, res) {
    const searchText = req.query.text;
    return searchFunction(searchText)
    .then((docs) => {
      console.log(docs);
      return res.status(200).json({
        success: true,
        payload: docs,
      });
    })
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}