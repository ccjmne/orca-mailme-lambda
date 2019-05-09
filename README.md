# orca-mailme-lambda

Serverless API endpoint to let clients get in touch.

Basically an AWS Lambda function leveraging SES, invoked through API Gateway and packaged into a CloudFormation stack using AWS SAM.

## Build, package and deploy

    npm run build
    npm run package
    npm run deploy

## Usage

| description      | value                              |
| ---------------- | ---------------------------------- |
| method           | `POST`                             |
| URL              | `<API URL>/<Stage>/<TemplateName>` |
| Query Parameters | `{ name, org, mail }`              |
| Body             | `<your message>`                   |

## AWS SES Templates administration

SES Templates administration made easy.
Drop your templates files under `/templates`, and run commands through `node templates`.

Available commands:

    templates <cmd> [args]

    Commands:
      templates list               list existing templates
      templates get <template>     get specified template
      templates create <template>  create template for specified template
      templates update <template>  update template for specified template
      templates delete <template>  delete template for specified template

    Options:
      --version  Show version number                                       [boolean]
      --help     Show help                                                 [boolean]
