import bcrypt from 'bcryptjs'; 
import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';

// Register a new user

export const register = async (req, res) => {

    try{
    //extract user details from request body
    const{name, email, password, role} = req.body;

    //check if all fields are provided(required fields)
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }


    //Check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }


    //create new user object(passwrod will be hashed by presave hook in user model)
    
    const user = await User.create({
        name, 
        email, 
        password,
        role //: role || "student"
    });


    res.status(201).json({
        message: 'User registered successfully', 
        user: {
            id:user._id, 
            name: user.name,
            email: user.email, 
            role: user.role}
    });
} catch(error){
    console.error('Error during user registration:', error); //error checking
res.status(500).json({
    message: 'Server error',
    erorr: error.message
});
}
};

export const login = async (req, res) => {
    try{
        //extract email and password from request body
        const {email, password} = req.body;

        //validate input

        if(!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }
        
        //check if user exists in Db

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        //compare provided password with stored hashed password

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        //generate JWT token

        const token = jwt.sign(
            {
            
            id: user._id, 
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
        );
        
        //login successful

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch(error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};