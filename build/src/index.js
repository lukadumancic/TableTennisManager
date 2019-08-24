"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var PlayerController_1 = __importDefault(require("./controllers/PlayerController"));
var MatchController_1 = __importDefault(require("./controllers/MatchController"));
var mongoose_1 = __importDefault(require("mongoose"));
var keys_1 = __importDefault(require("../config/keys"));
require('./models/Players');
require('./models/Matches');
mongoose_1.default.connect(keys_1.default.mongoURI, { useNewUrlParser: true });
var app = new App_1.default([new PlayerController_1.default(), new MatchController_1.default()], process.env.PORT ? parseInt(process.env.PORT) : 3000);
app.listen();
