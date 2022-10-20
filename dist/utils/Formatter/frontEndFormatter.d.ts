import { Response } from './response.entity';
export default class FrontEndFormatter extends Response<any> {
    static format(object: Response<any>): Promise<Response<any>>;
    private static adaptToSDK;
}
