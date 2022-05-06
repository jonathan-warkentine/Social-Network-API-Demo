const mongoose = require('mongoose');
const { Schema, Type } = mongoose;

const reactionSchema = new Schema({
  reactionID: {
    type: mongoose.ObjectId,
    default: mongoose.Types.ObjectId()
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reactions: {
    type: [reactionSchema]
  }
});

//virtual: reactionCount


const Thought = mongoose.model('Thought', thoughtSchema);