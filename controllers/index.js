const {
    getThought,
    getThoughts, 
    postThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('./thoughts.controllers');

const {
    getUser, 
    getUsers, 
    postUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend 
} = require('./users.controllers');

module.exports = {
    getUser, 
    getUsers, 
    postUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend,
    getThought,
    getThoughts, 
    postThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction 
};