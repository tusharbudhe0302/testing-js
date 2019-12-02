const jsonPlace = require('../services/json.placeholder');

module.exports = function (jsonplaceRoute) {
    jsonplaceRoute.get('/jsonplace', async (req, res, next) => {
        try {
            let jsonPlaceHolderResponse = await jsonPlace.getJsonPlaceHolderResponse();
            res.status(200).send({
                errorMessage: null,
                data: jsonPlaceHolderResponse
            })
        } catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }
    })
    return jsonplaceRoute;
}