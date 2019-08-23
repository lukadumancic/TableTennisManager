const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: String
});

mongoose.model('players', playerSchema);
