import mongoose from 'mongoose';
const { Schema } = mongoose;

const SetSchema = require('./Sets');

const matchSchema = new Schema({
  playerId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  playerId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  score: [SetSchema]
});

mongoose.model('matches', matchSchema);
