const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token ) return res.status(400).send('no auth token');
    
    jwt.verify(token, process.env.LOGIN_SECRET_TOKEN, (err, user)=>{
        if(err) return res.status(401).send('invalid auth token');
        req.user = user;
        next(); 
    })

}