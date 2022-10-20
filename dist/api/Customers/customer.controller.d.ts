import { Customer } from 'src/models/customer.entity';
import { CustomerService } from './customer.service';
import { Response } from 'src/utils/Formatter/response.entity';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    getCustomers(query: any): Promise<Response<Customer[]>>;
    getCustomer(id: number): Promise<Response<Customer>>;
    searchCustomer(customerData: {
        queryString: string;
        queryFilters: {};
    }): Promise<any>;
    addCustomer(customerData: Customer): Promise<Response<Customer>>;
    updateCustomer(customerData: Customer): Promise<Response<Customer>>;
    deleteCustomer(id: number): Promise<Response<Customer>>;
}
