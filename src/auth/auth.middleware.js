const model = require('../users/users.model');

const method = require('./auth.methods');


exports.isAuth = async (req,res,next) => {
    // get access token from headers
    const acccesToken = req.headers.authorization;
    if(!acccesToken)
        return res.status(401).send({
            message:"No Access Token found"
        });

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const verified = await method.verifyToken(
            acccesToken,
            accessTokenSecret
        );

        if(!verified)
        {
            return res.status(401).send({
                message:"Member permission required"
            })

        }

        const user = await model.getUser(verified.payload.username);

        req.user = user;

        return next();
}