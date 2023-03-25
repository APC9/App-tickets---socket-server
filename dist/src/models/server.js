"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("../sockets/controller");
class Server {
    constructor() {
        this.paths = {
        //users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.server = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.server);
        //middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        //Sockets
        this.sockets();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        //this.app.use( this.paths.users, routerUser );
    }
    sockets() {
        this.io.on('connection', controller_1.socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map