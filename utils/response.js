const yaml = require('js-yaml-loader!../template.yml');

export class Response {
  constructor(status, body) {
    this.isBase64Encoded = false;
    this.headers = { 'Access-Control-Allow-Origin': (/^'(.+)'$/.exec(yaml.Globals.Api.Cors.AllowOrigin))[1] };
    this.statusCode = status;
    this.body = JSON.stringify(typeof body === 'string' ? { message: body } : body, null, 2);
  }

  static OK(body = {}) {
    return new Response(200, body);
  }

  static BAD_REQUEST(body = {}) {
    return new Response(400, body);
  }
}
