import { Logger } from '@nestjs/common';
import FrontEndFormatter from './frontEndFormatter';

export class BackendFormatter {
  private static readonly log = new Logger(BackendFormatter.name);
  public static async logger(func: any): Promise<any> {
    try {
      let response: any;
      if (Array.isArray(func)) {
        response = await Promise.all(func.map(async (f) => await f));
      } else {
        response = await func;
      }
      this.log.log(await FrontEndFormatter.format({ records: response }));
      return response;
    } catch (error) {
      this.log.error(`Error: ${error}`);
    }
  }
}
