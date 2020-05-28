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
const folders_1 = require("./enums/folders");
const SubFolderMappings_1 = require("./mappings/SubFolderMappings");
const template_1 = require("./enums/template");
const path_1 = require("path");
const fs_1 = require("fs");
const handlerFunctions_1 = require("./handlerFunctions");
function bootstrapFolders() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectRoot = vscode.workspace.workspaceFolders;
        if (projectRoot !== undefined) {
            for (let key in folders_1.TlFolder) {
                const value = folders_1.TlFolder[key];
                const folder = path_1.join(projectRoot[0].uri.fsPath, value);
                try {
                    fs_1.mkdirSync(folder);
                }
                catch (error) {
                    throw new Error(error);
                }
            }
            for (const [key, value] of SubFolderMappings_1.SubFolderMappings) {
                const tlf = value.topLevelFolder;
                const subfol = value.subFolder;
                const fullPath = path_1.join(projectRoot[0].uri.fsPath, tlf, subfol);
                try {
                    fs_1.mkdirSync(fullPath);
                }
                catch (error) {
                    throw new Error(error);
                }
            }
            // for files within a top level folder
            const TEMPLATE_FOLDER = 'templateFiles';
            for (const [key, value] of SubFolderMappings_1.BootstrapFiles) {
                const fullPath = path_1.join(projectRoot[0].uri.fsPath, value.destination, value.filename);
                try {
                    fs_1.writeFileSync(fullPath, fs_1.readFileSync(path_1.join(__dirname, TEMPLATE_FOLDER, value.templateFile), 'utf-8'), { flag: 'wx+' });
                }
                catch (e) {
                    console.log(e);
                }
            }
            // Special case for the workflow template as it is in a subfolder
            let fullPath = path_1.join(projectRoot[0].uri.fsPath, folders_1.TlFolder.Actions, folders_1.SubFolder.ActionsWorkflows, 'workflow.yaml');
            try {
                fs_1.writeFileSync(fullPath, fs_1.readFileSync(path_1.join(__dirname, TEMPLATE_FOLDER, template_1.TemplateFile.WorkflowMetadata), 'utf-8'), { flag: 'wx+' });
            }
            catch (e) {
                console.log(e);
            }
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
            // Write Pack Config File
            const PackMappings = {
                'ref': ref,
                'name': packname,
                'author': author,
                'email': email
            };
            let PackFileContent = handlerFunctions_1.generateTemplate(template_1.TemplateFile.packFile, PackMappings);
            handlerFunctions_1.writeFileContent(path_1.join(projectRoot[0].uri.fsPath, 'pack.yaml'), PackFileContent, 'pack.yaml', true);
            const ReadMeMappings = {
                name: packname
            };
            let ReadMeContent = handlerFunctions_1.generateTemplate(template_1.TemplateFile.ReadMe, ReadMeMappings);
            handlerFunctions_1.writeFileContent(path_1.join(projectRoot[0].uri.fsPath, 'README.md'), ReadMeContent, 'README.md', true);
        }
    });
}
exports.bootstrapFolders = bootstrapFolders;
//# sourceMappingURL=bootstrap-function.js.map