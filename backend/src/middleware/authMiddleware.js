import jwt from 'jsonwebtoken';
import User from '../models/User.js';  


const authMiddleware = async (req, res, next) => {
    
try{

    //Get token from header
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'No token provided, authorization denied'});
    }
    const token = authHeader.split(' ')[1]; //Extract token part

    //Verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password'); //Exclude password field

    if(!user){
        return res.status(401).json({message: 'User not found'});
    }

    req.user = user; //Attach user to request object

    next(); //Proceed to next middleware/controller

} catch(error){
    //console.error('Auth Middleware Error:', error);
    res.status(401).json({message: 'Invalid or expired token'});
    
}
};

export default authMiddleware;