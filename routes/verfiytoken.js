const jwt=require('jsonwebtoken');
require('dotenv').config()

module.exports = function auth(req,res,next){
    const token=req.headers["x-access-token"];
    if(!token) return res.status(401).send('access denied');
    try{
        const verified=jwt.verify(token,process.env.JWTSECRET)
        req.user=verified;
        next()

    }catch(err){
        res.status(400).send('invalid token')
    }
}