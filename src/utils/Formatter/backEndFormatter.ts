import { Logger } from '@nestjs/common';
import FrontEndFormatter from './frontEndFormatter';

export class BackendFormatter {
  private static readonly log = new Logger(BackendFormatter.name);
  public static async logger(func: any): Promise<any> {
    try {
      const response: Function = await func;
      this.log.verbose(`Response was succesfully received`);
      this.log.log(await FrontEndFormatter.format({ records: response }));
      return response;
    } catch (error) {
      this.log.error(`Error was received: ${JSON.stringify(error)}`);
      this.log.error(error);
    }
  }
}
