"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prod_1 = __importDefault(require("./prod"));
var dev_1 = __importDefault(require("./dev"));
var keys = process.env.NODE_ENV === 'production' ? prod_1.default : dev_1.default;
exports.default = keys;
