"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var checkPrivileges_1 = __importDefault(require("../middlewares/checkPrivileges"));
var rankPointsQuery_1 = __importDefault(require("../helpers/rankPointsQuery"));
var PlayerController = /** @class */ (function () {
    function PlayerController(pathPrefix) {
        if (pathPrefix === void 0) { pathPrefix = ''; }
        var _this = this;
        this.path = '/players';
        this.router = express_1.default.Router();
        this.Player = mongoose_1.default.model('players');
        this.getPlayers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var players, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Player.find({})];
                    case 1:
                        players = _a.sent();
                        res.send(players);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.send({ error: 'Something went wrong' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createPlayer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var name, player, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        name = req.body.name;
                        if (!name) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Player.create({ name: name })];
                    case 1:
                        player = _a.sent();
                        res.send(player);
                        return [3 /*break*/, 3];
                    case 2:
                        res.send({ error: 'Params missing' });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        res.send({ error: 'Error while creating new player' });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getPlayerRankPoints = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var rankPoints1, rankPoints2_1, totalPoints, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.Player.aggregate(rankPointsQuery_1.default(1))];
                    case 1:
                        rankPoints1 = _a.sent();
                        return [4 /*yield*/, this.Player.aggregate(rankPointsQuery_1.default(2))];
                    case 2:
                        rankPoints2_1 = _a.sent();
                        totalPoints = rankPoints1.map(function (rankPoint1) {
                            var rankPoint2 = rankPoints2_1.find(function (value) {
                                return value._id.toHexString() === rankPoint1._id.toHexString();
                            });
                            return __assign({}, rankPoint1, { setWonSum: rankPoint1.setWonSum + rankPoint2.setWonSum });
                        });
                        res.send(totalPoints);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        res.send({ error: 'Something went wrong' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.path = pathPrefix + '/players';
        this.intializeRoutes();
    }
    PlayerController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getPlayers);
        this.router.get(this.path + '/rank', this.getPlayerRankPoints);
        this.router.post(this.path, checkPrivileges_1.default, this.createPlayer);
    };
    return PlayerController;
}());
exports.default = PlayerController;
