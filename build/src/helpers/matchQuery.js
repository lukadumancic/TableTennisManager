"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (playerId1, playerId2, id) {
    return [
        {
            $match: id
                ? { _id: mongoose_1.default.Types.ObjectId(id) }
                : playerId1 && playerId2
                    ? {
                        playerId1: mongoose_1.default.Types.ObjectId(playerId1),
                        playerId2: mongoose_1.default.Types.ObjectId(playerId2)
                    }
                    : {}
        },
        {
            $lookup: {
                from: 'players',
                localField: 'playerId1',
                foreignField: "_id",
                as: 'player1'
            }
        },
        {
            $lookup: {
                from: 'players',
                localField: 'playerId2',
                foreignField: "_id",
                as: 'player2'
            }
        },
        {
            $project: {
                player1: {
                    $arrayElemAt: ['$player1', 0]
                },
                player2: {
                    $arrayElemAt: ['$player2', 0]
                },
                score: '$score'
            }
        }
    ];
});
