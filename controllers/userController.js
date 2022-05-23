import mg from 'mongoose';
import { User, Thought } from '../models/index.js';

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'friends', select: '-__v'});

        return !user
            ? res.status(404).json({message: 'No user with this ID'})
            : res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const missing = [];
        
        if (username && email) {
            const user = await User.create({ 
                username, 
                email 
            });

            return res.status(200).json({message:`New user ${user.username} created`});
        }

        if (!username) missing.push('username');
        if (!email) missing.push('email');

        return res.status(400).json({message:`Required fields missing: ${missing.join(', ')}`});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        const { username, email } = req.body;

        if (!username && !email) {
            return res.status(400).json({message:`No username or email provided`});
        }

        if (user.username === username && user.email === email) {
            return res.status(400).json({message: 'No changes made'});
        } 

        if (username) user.username = username;
        if (email) user.email = email;
        user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (!user) {
            return res.status(400).json({message: 'No user with this ID'});
        }

        const userThoughts = await Thought.deleteMany({username: user.username});

        await User.deleteOne({_id: req.params.id});

        return res.status(200).json({userDeleted: true, thoughtsDeletedCount: userThoughts.deletedCount});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const addFriend = async (req,res) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        const friend = await User.findOne({_id: req.params.friendId});
        
        if (!user) {
            return res.status(400).json({message: 'No user with this ID'});
        }

        if (!friend) {
            return res.status(400).json({message: 'No friend with this ID'});
        }

        user.friends.push(friend._id);
        user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const deleteFriend = async (req,res) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        const friend = await User.findOne({_id: req.params.friendId});
        const friendIndex = user.friends.indexOf(friend._id);
        
        if (!user) {
            return res.status(400).json({message: 'No user with this ID'});
        }

        if (!friend) {
            return res.status(400).json({message: 'No friend with this ID'});
        }

        user.friends.splice(friendIndex, 1);
        user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

export { 
    getUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend
};