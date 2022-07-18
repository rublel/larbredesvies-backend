import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly log: Logger,
  ) {}

  public async getCustomer(id: number): Promise<any> {
    return await BackendFormatter.logger(
      this.customerRepository.findBy({ id }),
    );
  }

  public async addCustomer(customer: Customer): Promise<any> {
    const checkIfExist = await this.checkIfExist(customer.email);
    if (!checkIfExist) {
      return await BackendFormatter.logger(
        this.customerRepository.save(customer),
      );
    } else {
      return checkIfExist;
    }
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

  public async checkIfExist(email: string): Promise<any> {
    const response = await this.customerRepository.findBy({ email });
    if (response.length > 0) {
      this.log.error(`Customer with email ${email} already exist`);
      return {
        message:
          'Email already exist - Can not add customer with this email, please try with another email',
        status: 'error',
      };
    }
  }
}
