"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeStaticPageBuild();
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/api', controller.router);
        });
    };
    App.prototype.initializeStaticPageBuild = function () {
        if (true || process.env.NODE_ENV === 'production') {
            var path_1 = require('path');
            this.app.use(express_1.default.static(path_1.resolve(__dirname, '..', '..', 'web', 'dist', 'web')));
            this.app.get('*', function (req, res) {
                res.sendFile(path_1.resolve(__dirname, '..', 'web', 'dist', 'web', 'index.html'));
            });
        }
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + _this.port);
        });
    };
    return App;
}());
exports.default = App;
