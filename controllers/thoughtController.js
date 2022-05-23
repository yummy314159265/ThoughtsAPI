import mg from 'mongoose';
import { Thought, User } from '../models/index.js';

const { ObjectId } = mg.Types;

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        return res.status(200).json(thoughts);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought
            .findOne({_id: req.params.id})
            .populate({path: 'reactions', select: '-__v'});
        
        return !thought
            ? res.status(404).json({message: "No thought with this ID"})
            : res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const user = await User.findOne({_id: userId});
        const missing = [];

        if (!thoughtText || !username) {
            if (!thoughtText) missing.push('thoughtText');
            if (!username) missing.push('username');
            return res.status(400).json({message:`Required fields missing: ${missing.join(', ')}`});
        }

        if (!user) {
            return res.status(400).json({message:`No such user`});
        }

        if (thoughtText && user) {
            const newThought = await Thought.create(req.body);

            user.thoughts.push(newThought._id);
            user.save();

            return res.status(200).json(newThought);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.id});
        const { thoughtText } = req.body;
        
        if (!thoughtText) {
            return res.status(400).json({message: 'Required fields missing: thoughtText'})
        }

        if (thought.thoughtText === thoughtText) {
            return res.status(400).json({message: 'No changes made'});
        }

        thought.thoughtText = thoughtText;
        thought.save();

        return res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.deleteOne({_id: req.params.id});

        if (thought.deletedCount === 0) {
            return res.status(400).json({message: 'No thought with this ID'});
        }

        return res.status(200).json({deleted: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

export { 
    getThoughts, 
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
};