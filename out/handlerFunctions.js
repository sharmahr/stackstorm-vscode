"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs_1 = require("fs");
const path_1 = require("path");
const logging_1 = require("./logging");
const lodash = require("lodash");
function writeFileContent(destinationFile, fileContent, fileName, showInfoMessages) {
    try {
        fs_1.writeFileSync(destinationFile, fileContent, { flag: 'wx+' });
        if (showInfoMessages === true) {
            vscode.window.showInformationMessage(`Created file ${fileName}`);
            logging_1.LogToConsole(`Created file ${fileName}`);
        }
    }
    catch (err) {
        vscode.window.showErrorMessage(`An error occoured, see console output.`);
        logging_1.LogToConsole(err);
    }
}
exports.writeFileContent = writeFileContent;
function getSettingOrInput(prompt, placeholder, setting, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        let PACK_CONFIG = vscode.workspace.getConfiguration('st2');
        if (PACK_CONFIG.get(setting, '')) {
            logging_1.LogToConsole(`Returning value of ${setting}`);
            let value = PACK_CONFIG.get(setting);
            return value;
        }
        else {
            logging_1.LogToConsole(`Cannot find ${setting}`);
            let value = yield vscode.window.showInputBox({ prompt: prompt, placeHolder: placeholder, value: defaultValue });
            return value;
        }
    });
}
exports.getSettingOrInput = getSettingOrInput;
function getInput(prompt, placeholder, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        let value = yield vscode.window.showInputBox({ prompt: prompt, placeHolder: placeholder, value: defaultValue });
        if (value) {
            return value;
        }
        else {
            return undefined;
        }
    });
}
exports.getInput = getInput;
function generateTemplate(templateFile, mappings) {
    const TEMPLATE_FOLDER = 'templateFiles';
    const templatePath = path_1.join(__dirname, TEMPLATE_FOLDER, templateFile);
    lodash.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const template = lodash.template(fs_1.readFileSync(templatePath, 'utf-8'));
    const content = template(mappings);
    return content;
}
exports.generateTemplate = generateTemplate;
//# sourceMappingURL=handlerFunctions.js.map