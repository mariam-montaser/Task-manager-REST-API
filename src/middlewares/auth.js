
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.jwtSecret);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user) throw new Error('Not Authorized.');

        req.token = token;
        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).send({error: 'Not Authorized.'})
    }
}


module.exports = auth;