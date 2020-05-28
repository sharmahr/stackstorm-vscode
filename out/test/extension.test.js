"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandMappings_1 = require("../mappings/CommandMappings");
const fs_1 = require("fs");
const path_1 = require("path");
suite('Content of Templates Match', function () {
    for (const [key, value] of CommandMappings_1.StandardCommandMappings) {
        const templateFile = value.templateFile;
        test(`Get content of ${templateFile}`, function () {
            const testfile = path_1.join(__dirname, '../../templateFiles/', templateFile);
            const content = fs_1.readFileSync(testfile, 'utf-8');
            // assert.strictEqual(content, generateTemplate(value.templateFile))
        });
    }
});
//# sourceMappingURL=extension.test.js.map