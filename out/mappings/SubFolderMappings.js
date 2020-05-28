"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const folders_1 = require("../enums/folders");
const template_1 = require("../enums/template");
exports.SubFolderMappings = new Map([
    [folders_1.SubFolder.ActionsLib, { topLevelFolder: folders_1.TlFolder.Actions, subFolder: folders_1.SubFolder.ActionsLib }],
    [folders_1.SubFolder.ActionsWorkflows, { topLevelFolder: folders_1.TlFolder.Actions, subFolder: folders_1.SubFolder.ActionsWorkflows }],
    [folders_1.SubFolder.SensorsCommon, { topLevelFolder: folders_1.TlFolder.Sensor, subFolder: folders_1.SubFolder.SensorsCommon }]
]);
exports.BootstrapFiles = new Map([
    [folders_1.bootstrapFiles.ActionMetadataTemplate, { templateFile: template_1.TemplateFile.ActionMetadata, destination: folders_1.TlFolder.Actions, filename: folders_1.bootstrapFiles.ActionMetadataTemplate }],
    [folders_1.bootstrapFiles.AliasTemplate, { templateFile: template_1.TemplateFile.AliasMetadata, destination: folders_1.TlFolder.Aliases, filename: folders_1.bootstrapFiles.AliasTemplate }],
    [folders_1.bootstrapFiles.ConfigSchemaTemplate, { templateFile: template_1.TemplateFile.configSchema, destination: '', filename: folders_1.bootstrapFiles.ConfigSchemaTemplate }],
    [folders_1.bootstrapFiles.PolicyTemplate, { templateFile: template_1.TemplateFile.PolicyMetadata, destination: folders_1.TlFolder.Policies, filename: folders_1.bootstrapFiles.PolicyTemplate }],
    [folders_1.bootstrapFiles.RuleTemplate, { templateFile: template_1.TemplateFile.RuleConfig, destination: folders_1.TlFolder.Rules, filename: folders_1.bootstrapFiles.RuleTemplate }],
    [folders_1.bootstrapFiles.SensorTemplate, { templateFile: template_1.TemplateFile.SensorMetadata, destination: folders_1.TlFolder.Sensor, filename: folders_1.bootstrapFiles.SensorTemplate }]
]);
//# sourceMappingURL=SubFolderMappings.js.map