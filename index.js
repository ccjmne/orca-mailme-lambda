'use strict';

import AWS from 'aws-sdk';
const SES = new AWS.SES({ region: 'eu-west-1' });

const from = { mail: 'infos@orca-solution.com', name: 'Orca — Renseignements' };

/**
 * @param { mail: string, name: string, org: string, message?: string } queryStringParameters The query parameters
 */
export async function handler({ queryStringParameters, pathParameters: { template: Template }, body: message }) {
  try {
    ['mail', 'name', 'org'].forEach(prop => {
      if (!queryStringParameters[prop]) {
        throw `Required '${prop}' query parameter not set`;
      }
    });

    const response = await SES.sendTemplatedEmail({
      Destination: {
        BccAddresses: ['nclsdevelopment@gmail.com'],
        ToAddresses: [queryStringParameters.mail]
      },
      Template,
      TemplateData: JSON.stringify({ ...queryStringParameters, message }),
      Source: `=?utf-8?B?${Buffer.from(from.name).toString('base64')}?=<${from.mail}>`,
      ReplyToAddresses: [from.mail]
    }).promise();
    return { statusCode: 200, headers: {}, isBase64Encoded: false, body: JSON.stringify(response, null, 2) };
  } catch (e) {
    return { statusCode: 400, headers: {}, isBase64Encoded: false, body: JSON.stringify(e, null, 2) };
  }
}
