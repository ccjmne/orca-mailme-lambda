'use strict';

import AWS from 'aws-sdk';
const SES = new AWS.SES({ region: 'eu-west-1' });

const from = { mail: 'infos@orca-solution.com', name: 'Orca — Renseignements' };

/**
 * @param { mail: string, name: string, org: string, message?: string } queryStringParameters The query parameters
 */
export async function handler({ queryStringParameters }, ctx) {

  const { mail } = queryStringParameters;
  const sesParams = {
    Destination: { ToAddresses: [mail], },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: require('./template.html').replace(/\$\{(mail|name|org|message)\}/g, (_, slot) => queryStringParameters[slot] || '<pas de message>'),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Orca — Prise de contact',
      },
    },
    ReplyToAddresses: [from.mail],
    Source: `=?utf-8?B?${Buffer.from(from.name).toString('base64')}?=<${from.mail}>`,
  };

  try {
    const response = await SES.sendEmail(sesParams).promise();
  } catch (e) {
    return { statusCode: 400, body: e };
  }

  return { statusCode: 200, body: response };
}
