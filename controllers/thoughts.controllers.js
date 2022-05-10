const connection = require('../config/connection')
const {Thought, User} = require('../models');

module.exports = {

    async getThought (req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought){
                res.status(404).json({'error': 'thought not found'});
            }
            else {
                res.status(200).json(thought);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find({});
            if (!thoughts){
                res.status(404).json({'error': 'no thoughts found'});
            }
            else {
                res.status(200).json(thoughts);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async postThought (req, res) {
        try {
            const newThought = await Thought.create(req.body);
            await User.updateOne(
                {_id: req.body.user_id}, 
                {$addToSet: {
                    thoughts: newThought._id
                }}
            );
            
            res.status(200).json(newThought);
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async updateThought (req, res) {
        try {
            const upThought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                {returnDocument: 'after'}
            );
            res.status(200).json(upThought);
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async deleteThought (req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.id});
            if (!thought){
                res.status(404).json({'error': 'no such thought'});
            }
            else {
                res.status(200).json(thought);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async postReaction (req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$addToSet: { reactions: req.body } },
                {returnDocument: 'after'}
            );

            if (!updateThought){
                res.status(404).json({'error': 'no such thought'});
            }
            else {
                res.status(200).json(updateThought);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },

    async deleteReaction (req, res) {
        try {
            const delThought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: { reactions: {reaction_id: req.params.reaction_id} } },
                {returnDocument: 'after'}
            );

            if (!delThought){
                res.status(404).json({'error': 'no such thought'});
            }
            else {
                res.status(200).json(delThought);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    },
}