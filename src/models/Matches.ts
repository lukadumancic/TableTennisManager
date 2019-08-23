const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetSchema = require('./Sets');

const matchSchema = new Schema({
  playerId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  playerId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  score: [SetSchema],
  totalScore: Number
});

mongoose.model('matches', matchSchema);
