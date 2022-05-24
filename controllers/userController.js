import mg from 'mongoose';
import { User, Thought } from '../models/index.js';

const { ObjectId } = mg.Types

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
        const user = await User.findOne({_id: ObjectId(req.params.id)})
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

        if (!username || !email) {
            if (!username) missing.push('username');
            if (!email) missing.push('email');
    
            return res.status(400).json({message:`Required fields missing: ${missing.join(', ')}`});
        }
        
        const user = await User.create({ 
            username, 
            email 
        });

        return res.status(200).json({message:`New user created`, user});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: ObjectId(req.params.id)});
        const { username, email } = req.body;
        const changes = [];

        if (!username && !email) {
            return res.status(400).json({message:`No username or email provided`});
        }

        if ((user.username === username || !username) && (user.email === email || !email)) {
            return res.status(400).json({message: 'No changes made', user});
        } 

        if (username) {
            changes.push('Username changed to ' + username);
            user.username = username;
        };

        if (email) {
            changes.push('Email changed to ' + email);
            user.email = email;
        }; 

        user.save();

        return res.status(200).json({changes, user});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: ObjectId(req.params.id)});

        if (!user) {
            return res.status(400).json({message: 'No user with this ID'});
        }

        const userThoughts = await Thought.deleteMany({username: user.username});

        await User.deleteOne({_id: ObjectId(req.params.id)});

        return res.status(200).json({userDeleted: true, thoughtsDeletedCount: userThoughts.deletedCount});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const addFriend = async (req,res) => {
    try {
        const user = await User.findOne({_id: ObjectId(req.params.userId)});
        const friend = await User.findOne({_id: ObjectId(req.params.friendId)});
        
        if (!user || !friend) {
            const doesNotExist = [];
            if (!user) doesNotExist.push(req.params.userId);
            if (!friend) doesNotExist.push(req.params.friendId);

            return res.status(400).json({message: `No user with ID: ${doesNotExist.join('; ')}`});
        }

        if (user.friends.includes(friend._id)) {
            return res.status(400).json({message: `User ${user.username} already has user ${friend.username} as a friend!`});
        }

        user.friends.push(ObjectId(friend._id));
        user.save();

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const deleteFriend = async (req,res) => {
    try {
        const user = await User.findOne({_id: ObjectId(req.params.userId)});
        const friend = await User.findOne({_id: ObjectId(req.params.friendId)});
        const friendIndex = user.friends.indexOf(ObjectId(friend._id));
        
        if (!user || !friend) {
            const doesNotExist = [];
            if (!user) doesNotExist.push('User ' + req.params.userId);
            if (!friend) doesNotExist.push('Friend ' + req.params.friendId);

            return res.status(400).json({message: `No user with ID: ${doesNotExist.join('; ')}`});
        }

        if (friendIndex === -1) {
            return res.status(400).json({message: `User does not have friend ${friend.username} with ID ${friend._id}`});
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