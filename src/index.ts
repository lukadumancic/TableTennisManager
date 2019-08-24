const App = require('./App.ts');
const PlayerController = require('./controllers/PlayerController');
const MatchController = require('./controllers/MatchController');
const mongoose = require('mongoose');
const keys = require('../config/keys.ts');

require('./models/Players');
require('./models/Matches');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = new App(
  [new PlayerController(), new MatchController()],
  process.env.PORT || 3000
);

app.listen();
