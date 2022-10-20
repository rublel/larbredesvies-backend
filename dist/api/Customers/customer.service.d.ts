import { Repository } from 'typeorm';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';
import { Response } from 'src/utils/Formatter/response.entity';
export declare class CustomerService extends CustomersAction {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: Repository<Customer>, logger: Logger);
    private readonly orderRepository;
    getCustomers(query: {
        [key: string]: string;
    }): Promise<{
        data: Customer[];
        total: number;
        perPage: number;
    }>;
    getCustomer(id: number): Promise<Customer | Response<any>>;
    searchCustomer({ queryString, queryFilters, }: {
        queryString: string;
        queryFilters: {
            [key: string]: number;
        };
    }): Promise<{
        data: Customer[] | Customer;
        count: number;
    }>;
    addCustomer(customer: Customer): Promise<Customer | Response<any>>;
    updateCustomer(customer: Customer): Promise<Customer | Response<any>>;
    deleteCustomer(id: number): Promise<any>;
}
