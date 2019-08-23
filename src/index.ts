const App = require('./App.ts');
const PlayerController = require('./controllers/PlayerController');
const mongoose = require('mongoose');
const keys = require('../config/keys.ts');

require('./models/Players');
require('./models/Matches');
mongoose.connect(keys.mongoURI);

const app = new App([new PlayerController()], 3000);

app.listen();
