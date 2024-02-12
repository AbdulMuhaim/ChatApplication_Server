// const jwt = require('jsonwebtoken');


// module.exports = {
// generateToken:(id)=>{
//     const token = jwt.sign({id},process.env.TOKEN_SECRET)
//     return token
// },

// authenticateToken:async(req, res, next)=>{
//     let token = req.headers.authorization

//   if (!token) {
//     console.log('no token')
//     return res.status(401).json({ message: 'Unauthorized: Missing token' });
//   }

//   if(token.startsWith('Bearer')){
//     console.log('token is there')
//     token.slice(7) 
// }

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Forbidden: Invalid token' });
//     }

//     req.user = user;
//     console.log(user);
//     next();
//   })
// }}




const jwt = require('jsonwebtoken');

module.exports = {

  generateToken: (id) => {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  },

  authenticateAccessToken: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    if (token.startsWith('Bearer')) {
      token.slice(7);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }

      req.user = user;
      next();
    });
  },

  authenticateRefreshToken: (refreshToken, callback) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return callback(err, null);
      }

      console.log("refresh token code worked");

      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      callback(null, accessToken);
    });
  },

};
