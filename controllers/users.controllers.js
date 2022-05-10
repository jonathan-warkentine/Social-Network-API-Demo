const connection = require('../config/connection');
const {User, Thought} = require('../models');

module.exports = {
    async getUser (req, res) {
        try {
            const user = await User.findOne({_id: req.params.id});

            if (!user){
                res.status(404).json({'error': 'no such user'});
            }
            else {
                res.status(200).json(user);
            }
        }
        catch (error){
            console.error(error);
            res.status(500).json(error);
        }
    },

    async getUsers (req, res) {
        try {
            const users = await User.find({});
            if (!users){
                res.status(400).json({'error': 'no users found'});
            }
            else {
                res.status(200).json(users);
            }
        }
        catch (error){
            console.error(error);
            res.status(500).json(error);
        }
    },

    async postUser (req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    async updateUser (req, res) {
        try {
            const updUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {returnDocument: 'after'}
            );

            res.status(200).json(updUser);
        }
        catch (error){
            console.error(error);
            res.status(500).json(error);
        }
    },

    async deleteUser (req, res) {
        try{
            const delUser = await User.findByIdAndDelete(req.params.id);
            const delThoughts = await Thought.deleteMany({username: delUser.username});

            if (!delUser){
                res.status(404).json({error: 'no such user'});
            }
            else {
                res.status(200).json(delThoughts? ({message: `all thoughts by user ${delUser.username} also deleted`}, delUser): delUser);
            }
        }
        catch (error){
            console.error(error);
            res.status(500).json(error);
        }
    },

    async addFriend (req, res) {
        try {
            const updUser = await User.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $addToSet: {
                        friends: req.params.friend_id
                    }
                },
                {returnDocument: 'after'}
            );

            res.status(200).json(updUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    async deleteFriend (req, res) {
        try {
            const results = await User.updateOne(
                {_id: req.params.id},
                {
                    $pull: {
                        friends: req.params.friend_id
                    }
                }
            );
            if (!results.modifiedCount){
                res.status(404).json({'error': 'no such friend'});
            }
            else {
                res.status(200).json(results);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}