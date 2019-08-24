"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var SetSchema = require('./Sets');
var matchSchema = new Schema({
    playerId1: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Player' },
    playerId2: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Player' },
    score: [SetSchema]
});
mongoose_1.default.model('matches', matchSchema);
