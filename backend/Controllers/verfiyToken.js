const jwt = require("jsonwebtoken");

const verifyToken = async function (request, response, next) {
    let isAuthorization = request.headers.authorization ? true : false;


    if (!isAuthorization || !request.headers) {
        response.status(401).send('Unauthorized You Don\'t have token');
    }
    // const token = request.header('Authorization');
    const token = request.headers.authorization


    if (!token) { return response.status(401).send('access denied ..!') }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified
        // response.json({
        //     isAuthorization: isAuthorization,
        //     token_Request_authorization: request.headers.authorization,
        //     token_POST_MAN: token
        // })
        next()

    } catch (error) {

        response.status(400).send('invalid token ')
    }

}


module.exports = verifyToken;
