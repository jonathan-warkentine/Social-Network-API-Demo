const router = require('express').Router();
const {getUser, getUsers, postUser, deleteUser, updateUser, addFriend, deleteFriend} = require('../../controllers');

router.route('/').get(getUsers).post(postUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friend_id').post(addFriend).delete(deleteFriend);

module.exports = router;