const jwt=require('jsonwebtoken');

module.exports = function auth(req,res,next){
    const token=req.headers('auth-token');
    if(!token) return res.status(401).send('access denied');
    try{
        const verified=jwt.verify(token,'sec')
        req.user=verified;
        next()

    }catch(err){
        res.status(400).send('invalid token')
    }
}