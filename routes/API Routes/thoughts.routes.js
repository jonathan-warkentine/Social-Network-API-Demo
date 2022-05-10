const router = require('express').Router();
const {getThought, getThoughts, postThought, deleteThought, updateThought, postReaction, deleteReaction} = require('../../controllers')

router.route('/').get(getThoughts).post(postThought);

router.route('/:id').get(getThought).delete(deleteThought).put(updateThought);

router.route('/:id/reactions').post(postReaction);

router.route('/:id/reactions/:reaction_id').delete(deleteReaction);

module.exports = router;