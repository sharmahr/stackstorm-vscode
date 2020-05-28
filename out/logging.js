"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const OutputConsoleName = 'StackStorm';
let _outputChannel;
function getOutputChannel() {
    if (!_outputChannel) {
        _outputChannel = vscode.window.createOutputChannel(OutputConsoleName);
    }
    return _outputChannel;
}
exports.getOutputChannel = getOutputChannel;
function LogToConsole(logMessage) {
    let now = new Date();
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    let datestamp = date + ' - ' + time;
    getOutputChannel().appendLine(`${datestamp}: ${logMessage}`);
}
exports.LogToConsole = LogToConsole;
//# sourceMappingURL=logging.js.map