import { Logger } from '@nestjs/common';

export class CustomersAction {
  constructor(private readonly customerModel, private readonly log: Logger) {}
  public async checkIfExist(email: string): Promise<any> {
    email ? email.split(' ').join('').toLowerCase() : null;
    const response = await this.customerModel.findBy({ email });
    if (response.length) {
      return {
        exist: true,
      };
    }
  }
}
