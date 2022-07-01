const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
// promisity two callbacks from jwt, as I hate using callbacks
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);


exports.generateToken =  async (payload,secretSignature,tokenLife) => {
    try {
            return await sign( {
                payload
            },
            secretSignature,
            {
                algorithm: 'HS256',
				expiresIn: tokenLife,
            });
    }
    catch(err) {
        console.log(`erro generating token from ${payload} with errorr ${err}`);
        return null;
    }
};

exports.decodeToken = async (token,secretKey) => {
    try {
        return await verify(token,secretKey,{
            ignoreExpiration:true,
        });
    } catch(err){
        console.log(`Error decoding token ${err}`);
        return null;
    }
};

exports.verifyToken = async (token,secretKey) => {
    try {
        return await verify(token,secretKey);
    }
    catch (err){
        console.log(`Error verify ${err}`);
        return null;
    }
};