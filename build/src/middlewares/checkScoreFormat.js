"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(require("../../config/constants"));
var MAX_SETS = constants_1.default.MAX_SETS, MAX_GEMS_IN_SET = constants_1.default.MAX_GEMS_IN_SET;
var WINNER_TARGET_SETS = Math.ceil(MAX_SETS / 2);
exports.default = (function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var score, playerSets, i, _a, points1, points2;
    return __generator(this, function (_b) {
        score = req.body.score;
        if (score) {
            if (Array.isArray(score)) {
                if (score.length >= Math.ceil(MAX_SETS / 2)) {
                    if (score.every(function (value) { return Array.isArray(value) && value.length === 2; })) {
                        playerSets = [0, 0];
                        for (i = 0; i < score.length; i++) {
                            _a = score[i], points1 = _a[0], points2 = _a[1];
                            if (points1 > MAX_GEMS_IN_SET || points2 > MAX_GEMS_IN_SET) {
                                if (Math.abs(points1 - points2) === 2) {
                                    if (points1 > points2) {
                                        playerSets[0]++;
                                        if (playerSets[1] === WINNER_TARGET_SETS) {
                                            return [2 /*return*/, res.send({ error: 'Too many sets' })];
                                        }
                                    }
                                    else {
                                        playerSets[1]++;
                                        if (playerSets[0] === WINNER_TARGET_SETS) {
                                            return [2 /*return*/, res.send({ error: 'Too many sets' })];
                                        }
                                    }
                                }
                                else {
                                    return [2 /*return*/, res.send({ error: 'Deuce points not valid' })];
                                }
                            }
                            else if (points1 === MAX_GEMS_IN_SET &&
                                points2 <= MAX_GEMS_IN_SET - 2) {
                                playerSets[0]++;
                            }
                            else if (points2 === MAX_GEMS_IN_SET &&
                                points1 <= MAX_GEMS_IN_SET - 2) {
                                playerSets[1]++;
                            }
                            else {
                                return [2 /*return*/, res.send({ error: 'Set points not valid' })];
                            }
                        }
                        if (playerSets[0] === WINNER_TARGET_SETS ||
                            playerSets[1] === WINNER_TARGET_SETS) {
                            next();
                        }
                        else {
                            return [2 /*return*/, res.send({ error: 'No winner' })];
                        }
                    }
                    else {
                        return [2 /*return*/, res.send({ error: 'Wrong data format' })];
                    }
                }
                else {
                    return [2 /*return*/, res.send({ error: 'Max number of sets exceeded' })];
                }
            }
            else {
                return [2 /*return*/, res.send({ error: 'Wrong data format' })];
            }
        }
        else {
            return [2 /*return*/, res.send({ error: 'Params missing' })];
        }
        return [2 /*return*/];
    });
}); });
