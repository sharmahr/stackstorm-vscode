"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../enums/command");
const template_1 = require("../enums/template");
exports.StandardCommandMappings = new Map([
    [command_1.Command.ConfigSchema, { filename: 'config.schema.yaml', templateFile: template_1.TemplateFile.configSchema }],
    [command_1.Command.ActionMetadata, { filename: 'action.yaml', templateFile: template_1.TemplateFile.ActionMetadata }],
    [command_1.Command.WorkflowMetadata, { filename: 'workflow.yaml', templateFile: template_1.TemplateFile.WorkflowMetadata }],
    [command_1.Command.RuleConfig, { filename: 'rule.yaml', templateFile: template_1.TemplateFile.RuleConfig }],
    [command_1.Command.AliasMetadata, { filename: 'alias.yaml', templateFile: template_1.TemplateFile.AliasMetadata }],
    [command_1.Command.SensorMetadata, { filename: 'sensor.yaml', templateFile: template_1.TemplateFile.SensorMetadata }],
    [command_1.Command.PolicyMetadata, { filename: 'policy.yaml', templateFile: template_1.TemplateFile.PolicyMetadata }]
]);
//# sourceMappingURL=CommandMappings.js.map