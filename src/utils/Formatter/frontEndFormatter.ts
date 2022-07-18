import { Response } from './response.entity';

export default class FrontEndFormatter extends Response {
  public static async format(object: Response): Promise<Response> {
    const sdk = await this.adaptToSDK(object.records, object.scroll_id);
    return sdk;
  }

  private static async adaptToSDK(response: any, scroll_id: string = null) {
    let responseSdk = { records: response };
    if (Array.isArray(response)) responseSdk['totalSize'] = response.length;
    if (!!scroll_id) responseSdk['scroll_id'] = scroll_id;
    return responseSdk;
  }
}
