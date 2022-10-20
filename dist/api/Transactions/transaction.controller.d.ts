import { Transaction } from 'src/models/transaction.entity';
import { TransactionsService } from './transaction.service';
import { CustomerService } from '../Customers/customer.service';
import { Response } from 'src/utils/Formatter/response.entity';
export declare class TransactionsController {
    private readonly transactionsService;
    private readonly customerService;
    constructor(transactionsService: TransactionsService, customerService: CustomerService);
    getCustomerTransactions(id: number): Promise<Response<{}>>;
    addTransaction(transaction: Transaction): Promise<Response<{}>>;
}
