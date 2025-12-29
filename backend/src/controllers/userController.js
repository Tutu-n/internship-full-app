import User from "../models/User.js";

//get logged in user profile

export const getMe = async (req, res) => {
    try {
        // req.user is set in authMiddleware
        const user = await User.findById(req.user.id).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        //console.error('Error fetching user profile:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

//get all users - admin only

export const getAllUsers = async (req, res) => {   
    try {
        const users = await User.find().select('-password'); // Exclude password field

        res.status(200).json({
            users
        });
    } catch (error) {
        //console.error('Error fetching all users:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

//get user by ID - self or admin only

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Allow access if the requester is admin or the user themselves

        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await User.findById(userId).select('-password'); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        //console.error('Error fetching user by ID:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

//update user profile - self only

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Self only

        const { name, email } = req.body;

        const updatedData = {};

        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password field

        res.status(200).json({
            user: updatedUser
        });
    } catch (error) {
        //console.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}


//change user role - admin only

export const changeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        // Validate role
        const validRoles = ['student', 'mentor', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { role } },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password field

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: updatedUser
        });
    } catch (error) {
        //console.error('Error changing user role:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}