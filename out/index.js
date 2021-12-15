"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const devextreme_showdown_1 = require("devextreme-showdown");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const tutSteps = (() => {
    const md2html = new devextreme_showdown_1.Converter();
    const conPath = (p) => path_1.default.join(path_1.default.join(path_1.default.dirname(__dirname), 'content'), p);
    return new Map(fs.readdirSync(conPath('./')).map(dir => {
        const match = dir.match(/^(\d{2}):(.*)/);
        if (!match)
            throw new Error("Couldn't parse content dir name: " + dir);
        const [, number, title] = match;
        return [parseInt(number), {
                title: title,
                explanation: md2html.makeHtml(fs.readFileSync(conPath(`${dir}/explanation.md`), 'utf-8')),
                example: fs.readFileSync(conPath(`/${dir}/example.html`), 'utf-8'),
                winConditions: fs.readFileSync(conPath(`/${dir}/winConditions.json`), 'utf-8'),
            }];
    }));
})();
app.use(express_1.default.static(path_1.default.join(__dirname, 'pub')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../pub/index.html'));
});
const tutStepFields = new Set(['title', 'explanation', 'example', 'winConditions']);
for (const field of tutStepFields) {
    app.get(`/${field}/:stepIndex`, (req, res) => {
        const step = tutSteps.get(parseInt(req.params.stepIndex));
        if (!step)
            return res.status(404).send(`<h1>404</h1><hr/> no such ${field}.`);
        res.send(step[field]);
    });
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
