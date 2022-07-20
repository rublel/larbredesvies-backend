import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';

@Injectable()
export class CustomerService extends CustomersAction {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly logger: Logger,
  ) {
    super(customerRepository, logger);
  }

  public async getCustomer(id: number): Promise<any> {
    const checker = await BackendFormatter.logger(
      this.customerRepository.findBy({ id }),
    );
    let response = {};
    checker?.length
      ? (response = checker[0])
      : ((response = {
          exist: false,
          error: `Customer with id ${id} does not exist`,
        }),
        this.logger.error(`Customer with id ${id} does not exist`));
    return response;
  }

  public async addCustomer(customer: Customer): Promise<any> {
    const checker = await this.checkIfExist(customer.email);
    let response = {};
    !checker?.exist
      ? (response = await BackendFormatter.logger(
          this.customerRepository.save(customer),
        ))
      : ((response = {
          error: 'Customer with this email already exist',
        }),
        this.logger.error('Customer with this email already exist'));
    return response;
  }

  public async updateCustomer(customer: Customer): Promise<any> {
    return {
      ...(await this.customerRepository.update(customer.id, customer)),
      ...(await BackendFormatter.logger(this.getCustomer(customer.id))),
    };
  }

  public async deleteCustomer(id: number): Promise<any> {
    return await BackendFormatter.logger(
      this.customerRepository.delete({ id }),
    );
  }
}
