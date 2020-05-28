"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CommandMappings_1 = require("./mappings/CommandMappings");
const functions_1 = require("./functions");
const bootstrap_function_1 = require("./bootstrap-function");
const command_1 = require("./enums/command");
const template_1 = require("./enums/template");
function activate(context) {
    for (const [key, value] of CommandMappings_1.StandardCommandMappings) {
        let command = vscode.commands.registerCommand(key, (uri) => {
            functions_1.writeStandardTemplate(value.templateFile, uri.fsPath, value.filename);
        });
        context.subscriptions.push(command);
    }
    const writeReadMeCommand = vscode.commands.registerCommand(command_1.Command.ReadMe, (uri) => {
        functions_1.writeReadMe(template_1.TemplateFile.ReadMe, uri.fsPath, 'README.md').catch(error => {
            vscode.window.showErrorMessage(error);
        });
    });
    context.subscriptions.push(writeReadMeCommand);
    const writePackConfigCommand = vscode.commands.registerCommand(command_1.Command.Packfile, (uri) => {
        functions_1.writePackConfig(template_1.TemplateFile.packFile, uri.fsPath, 'pack.yaml').catch(error => {
            vscode.window.showErrorMessage(error);
        });
    });
    context.subscriptions.push(writePackConfigCommand);
    const bootstrapFolder = vscode.commands.registerCommand(command_1.Command.BootstrapFolder, () => {
        bootstrap_function_1.bootstrapFolders().catch(error => {
            vscode.window.showErrorMessage(error);
        });
    });
    context.subscriptions.push(bootstrapFolder);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map