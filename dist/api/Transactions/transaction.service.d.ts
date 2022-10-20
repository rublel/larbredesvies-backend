import { Transaction } from 'src/models/transaction.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Response } from 'src/utils/Formatter/response.entity';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly logger;
    constructor(transactionRepository: Repository<Transaction>, logger: Logger);
    addTransaction(orderData: any): Promise<Transaction[] | Response<string>>;
    getCustomerTransactions(id: number): Promise<{
        [key: string]: string | number;
    }>;
}
