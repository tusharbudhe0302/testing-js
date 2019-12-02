const request = require('request');

const getJsonPlaceHolderResponse = function () {
    const headers = {
        'Content-Type': 'application/json'
    };
    return new Promise((resolve, reject) => {
        request.get({
            url: 'http://jsonplaceholder.typicode.com/posts',
            headers: headers
        }, function (err, result, body) {
            if (err) {
                // console.log(`Error in genrating jsonplaceholder  :  ${err}`);
                return reject(err);
            }
            else {
                const bodyObj = JSON.parse(body);
                // console.log(`Azure AD Power BI authentication sucessfull !`);
                resolve(bodyObj);
            }
        });
    })
}
module.exports = { getJsonPlaceHolderResponse };