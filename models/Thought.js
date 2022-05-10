const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
  reaction_id: {
    type: Types.ObjectId,
    default: Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  createdAt: { 
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  reactions: {
    type: [reactionSchema]
  }
});

//virtual: reactionCount


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;