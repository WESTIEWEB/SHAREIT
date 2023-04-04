"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./database");
const users_route_1 = __importDefault(require("./routes/users-route"));
const chat_engine_route_1 = __importDefault(require("./routes/chat-engine.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const DB_URL = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce';
try {
    (0, database_1.dbConnection)(DB_URL);
}
catch (err) {
    console.log(err);
}
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
app.use('/users', users_route_1.default);
app.use('/chat-engine', chat_engine_route_1.default);
app.use('/', (req, res) => {
    res.send('hello');
});
const port = process.env.port || 3000;
exports.server = app.listen(port, () => {
    console.log(`server is listening on: ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map