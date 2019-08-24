import App from './App';
import PlayerController from './controllers/PlayerController';
import MatchController from './controllers/MatchController';
import mongoose from 'mongoose';

import keys from '../config/keys';

require('./models/Players');
require('./models/Matches');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = new App(
  [new PlayerController(), new MatchController()],
  process.env.PORT ? parseInt(process.env.PORT) : 3000
);

app.listen();
