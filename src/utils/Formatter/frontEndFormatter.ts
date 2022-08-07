import { Response } from './response.entity';

export default class FrontEndFormatter extends Response<any> {
  public static async format(object: Response<any>): Promise<Response<any>> {
    const sdk = await this.adaptToSDK(object.records);
    return sdk;
  }

  private static async adaptToSDK(response: any, scroll_id: string = null) {
    let responseSdk = response?.error
      ? { error: response.error, success: false }
      : { records: response, success: true };
    if (Array.isArray(response)) responseSdk['totalSize'] = response.length;
    return responseSdk;
  }
}
