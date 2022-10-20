import { Logger } from '@nestjs/common';
export declare class CustomersAction {
    private readonly customerModel;
    private readonly log;
    constructor(customerModel: any, log: Logger);
    checkIfExist(email: string): Promise<any>;
}
