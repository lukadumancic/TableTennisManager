"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (player, playerId) {
    var _a;
    var query = [
        {
            $match: playerId
                ? {
                    _id: mongoose_1.default.Types.ObjectId(playerId)
                }
                : {}
        },
        {
            $lookup: {
                from: 'matches',
                localField: '_id',
                foreignField: "playerId" + player,
                as: 'matches'
            }
        },
        {
            $project: {
                _id: '$_id',
                name: '$name',
                setWonSum: {
                    $sum: {
                        $map: {
                            input: '$matches',
                            as: 'match',
                            in: {
                                $size: {
                                    $filter: {
                                        input: '$$match.score',
                                        as: 'set',
                                        cond: (_a = {},
                                            _a[player === 1 ? '$gte' : '$lte'] = [
                                                '$$set.points1',
                                                '$$set.points2'
                                            ],
                                            _a)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ];
    return query;
});
