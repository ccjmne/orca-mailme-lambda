'use strict';

/**
 * @param { mail: string, name: string, org: string, message?: string } queryStringParameters The query parameters
 */
export async function handler({ queryStringParameters }, ctx) {
  return {
    statusCode: 200,
    body: require('./template.html').replace(/\$\{(mail|name|org|message)\}/g, (_, slot) => queryStringParameters[slot] || '<pas de message>'),
    headers: { 'Content-Type': 'text/html' }
  };
}
