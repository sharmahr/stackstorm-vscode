import { Command } from '../enums/command';
import { IntTemplate, GenTemplate } from '../interfaces/template';
import { TemplateFile } from '../enums/template';
import { genFunction } from '../enums/functions';

export const StandardCommandMappings = new Map<Command, IntTemplate>([
    //[Command.ReadMe, {filename: 'README.md', templateFile: TemplateFile.ReadMe}]
    [Command.ConfigSchema, {filename: 'config.schema.yaml', templateFile: TemplateFile.configSchema}],
    [Command.ActionMetadata, {filename: 'action.yaml', templateFile: TemplateFile.ActionMetadata}],
    [Command.WorkflowMetadata, {filename: 'workflow.yaml', templateFile: TemplateFile.WorkflowMetadata}],
    [Command.RuleConfig, {filename: 'rule.yaml', templateFile: TemplateFile.RuleConfig}],
    [Command.SensorMetadata, {filename: 'sensor.yaml', templateFile: TemplateFile.SensorMetadata}],
    [Command.PolicyMetadata, {filename: 'policy.yaml', templateFile: TemplateFile.PolicyMetadata}]
]);

export const generateFileCommandMappings = new Map<Command, GenTemplate>([
    [Command.ReadMe, {filename: 'README.md', templateFile: TemplateFile.ReadMe, functionName: 'readme'}]
]);
//[Command.Packfile, {filename: 'pack.yaml', templateFile: TemplateFile.packFile}],