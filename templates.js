'use strict';

const fs = require('fs');
const yargs = require('yargs');
const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'eu-west-1', credentials: new(AWS.SharedIniFileCredentials)() });

const readFile = filename => new Promise((resolve, reject) => fs.readFile(filename, 'utf8', (err, buffer) => err ? reject(err) : resolve(buffer)));
const getTemplate = yargs => yargs.positional('template', { type: 'string', describe: 'the TemplateName property identifying the SES Template' });

return yargs
  .scriptName('templates')
  .usage('$0 <cmd> [args]')
  .command('list', 'list existing templates', () => null, async () => {
    const response = await SES.listTemplates().promise();
    console.log(response);
  })
  .command('get <template>', 'get specified template', getTemplate, async ({ template: TemplateName }) => {
    const response = await SES.getTemplate({ TemplateName }).promise();
    console.log(response);
  })
  .command('create <template>', 'create template for specified template', getTemplate, async ({ template: TemplateName }) => {
    const response = await SES.createTemplate({ TemplateName }).promise();
    console.log(response);
  })
  .command('update <template>', 'update template for specified template', getTemplate, async ({ template: TemplateName }) => {
    const HtmlPart = await readFile(`${__dirname}/templates/${TemplateName}.html`);
    const TextPart = await readFile(`${__dirname}/templates/${TemplateName}.txt`);
    const response = await SES.updateTemplate({ Template: { ...require(`./templates/${TemplateName}.json`), TemplateName, HtmlPart, TextPart } }).promise();
    console.log(response);
  })
  .command('delete <template>', 'delete template for specified template', getTemplate, async ({ template: TemplateName }) => {
    const response = await SES.deleteTemplate({ TemplateName }).promise();
    console.log(response);
  })
  .help()
  .argv;
