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
const path_1 = require("path");
const fs_1 = require("fs");
const vscode = require("vscode");
const template_1 = require("./enums/template");
const handlerFunctions_1 = require("./handlerFunctions");
const logging_1 = require("./logging");
logging_1.getOutputChannel().show(true);
function writeStandardTemplate(templateFile, destination, filename) {
    logging_1.LogToConsole(`Creating ${filename} file`);
    const TEMPLATE_FOLDER = 'templateFiles';
    let templatePath = path_1.join(__dirname, TEMPLATE_FOLDER, templateFile);
    let content = fs_1.readFileSync(templatePath, 'utf-8');
    let destinationFile = path_1.join(destination, filename);
    handlerFunctions_1.writeFileContent(destinationFile, content, filename, false);
}
exports.writeStandardTemplate = writeStandardTemplate;
function writeReadMe(templateFile, destination, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        logging_1.LogToConsole('Checking if file already exists');
        logging_1.LogToConsole(path_1.join(destination, filename));
        logging_1.LogToConsole('Creating ReadMe file');
        let packname = yield vscode.window.showInputBox({ prompt: 'Enter Pack Name (This will be the header of the README)', placeHolder: 'Stackstorm Integration Pack', value: 'My First Pack' });
        if (!packname) {
            vscode.window.showErrorMessage('Please enter a pack name');
            logging_1.LogToConsole('No pack name given');
        }
        else {
            const mapping = {
                name: packname
            };
            let content = handlerFunctions_1.generateTemplate(templateFile, mapping);
            handlerFunctions_1.writeFileContent(path_1.join(destination, filename), content, filename, true);
        }
    });
}
exports.writeReadMe = writeReadMe;
function writePackConfig(templateFile, destination, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        logging_1.LogToConsole('Writing pack config file');
        let validChars = '^[0-9a-zA-Z-]+$';
        let ref = yield handlerFunctions_1.getInput('Pack Reference (lowercase and (-) only)', 'pack-reference', 'my-first-pack');
        if (ref === undefined) {
            vscode.window.showErrorMessage('No string given', 'Got it');
            throw new Error('Undefined ref');
        }
        else if (!ref.match(validChars)) {
            vscode.window.showErrorMessage('Pack name can only contain letters, numbers and dashes', 'Got it');
            throw new Error('Pack name can only contain letters, numbers and dashes. Pack will not be created correctly.');
        }
        let packname = ref.replace(/-/g, ' ').toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        let author = yield handlerFunctions_1.getSettingOrInput('Pack Author', 'Pack Author', 'defaultAuthor', 'John Doe');
        let email = yield handlerFunctions_1.getSettingOrInput('Author Email', 'Author Email', 'defaultEmail', 'john@example.com');
        if (!ref || !packname || !author || !email) {
            vscode.window.showErrorMessage('Please fill in all information required', 'Got it');
            logging_1.LogToConsole('Not all information provided. Got the following:');
            logging_1.LogToConsole(`ref: ${ref}`);
            logging_1.LogToConsole(`packname: ${packname}`);
            logging_1.LogToConsole(`author: ${author}`);
            logging_1.LogToConsole(`email: ${email}`);
            throw new Error('Not all information provided');
        }
        const mappings = {
            'ref': ref,
            'name': packname,
            'author': author,
            'email': email
        };
        let content = handlerFunctions_1.generateTemplate(template_1.TemplateFile.packFile, mappings);
        handlerFunctions_1.writeFileContent(path_1.join(destination, filename), content, filename, false);
    });
}
exports.writePackConfig = writePackConfig;
//# sourceMappingURL=functions.js.map