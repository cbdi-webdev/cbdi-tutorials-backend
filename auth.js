const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
     const authHeader = req.headers.authorization;

     if(authHeader == null) return res.status(401).json("Access Denied");

     const token = authHeader.slice(7);

     try{
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          req.user = decodedToken;

          next();

     }catch(err){
          res.status(403).json(err.message);
     }
}

const adminAuth = (req, res, next) => {
     if(!req.user.isAdmin)
     return res.status(403).json("Must be an Admin to have access")

     next();
}


module.exports = {
     userAuth,
     adminAuth
}