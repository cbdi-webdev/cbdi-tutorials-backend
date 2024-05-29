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


module.exports = {
     userAuth
}