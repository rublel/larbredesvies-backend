import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';
import { Transaction } from 'src/models/transaction.entity';
import { validate } from 'email-validator';
import { Response } from 'src/utils/Formatter/response.entity';
@Injectable()
export class CustomerService extends CustomersAction {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly logger: Logger,
  ) {
    super(customerRepository, logger);
  }
  @InjectRepository(Transaction)
  private readonly orderRepository: Repository<Transaction>;

  async getCustomers(query: { [key: string]: string }): Promise<{
    data: Customer[];
    total: number;
    perPage: number;
  }> {
    const page = query.page || 1;
    const perPage = +query.perPage || 20;
    const isAsc = query.isAsc || 'DESC';
    const sortBy = query.sortBy || 'id';
    const [result, total] = await this.customerRepository.findAndCount({
      order: { [sortBy]: isAsc },
      take: perPage,
      skip: (+page - 1) * perPage,
    });
    return {
      data: result,
      total,
      perPage,
    };
  }

  public async getCustomer(id: number): Promise<Customer | Response<any>> {
    const checker = await this.customerRepository.findBy({ id });
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

  async searchCustomer({
    queryString,
    queryFilters,
  }: {
    queryString: string;
    queryFilters: { [key: string]: number };
  }): Promise<{ data: Customer[] | Customer; count: number }> {
    const page = queryFilters.page || 1;
    const perPage = +queryFilters.perPage || 20;
    const isAsc = queryFilters.isAsc || 'DESC';
    const sortBy = queryFilters.sortBy || 'id';
    const [result, total] = await this.customerRepository.findAndCount({
      where: [
        { name: Like(`%${queryString}%`) },
        { siret: Like(`%${queryString}%`) },
        { email: Like(`%${queryString}%`) },
      ],
      order: { [sortBy]: isAsc },
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return {
      data: result,
      count: total,
    };
  }

  public async addCustomer(
    customer: Customer,
  ): Promise<Customer | Response<any>> {
    const checker = await this.checkIfExist(customer.email);
    return customer.email && customer.email.length > 0
      ? !checker?.exist
        ? validate(customer.email)
          ? this.customerRepository.save(customer)
          : { error: `L'email ${customer.email} n'est pas valide !` }
        : { error: `L'email ${customer.email} existe déjà !` }
      : { error: `Adresse email obligatoire !` };
  }

  public async updateCustomer(
    customer: Customer,
  ): Promise<Customer | Response<any>> {
    const checker = await this.checkIfExist(customer.email);
    if (customer.password) {
      return {
        error: `Le mot de passe ne peut pas être modifié !`,
      };
    }
    if (customer.email && !validate(customer.email)) {
      return {
        error: `L'email ${customer.email} n'est pas valide !`,
      };
    }
    const currentEmail = await this.getCustomer(customer.id).then((res) => {
      if (res instanceof Customer) return res.email;
    });
    return !customer.email ||
      !checker ||
      (checker && currentEmail === customer.email)
      ? ((customer.last_update = new Date()),
        await this.customerRepository.update(customer.id, customer),
        this.getCustomer(customer.id))
      : {
          error: `L'email ${customer.email} est déjà utilisé !`,
        };
  }

  public deleteCustomer(id: number): Promise<any> {
    return this.customerRepository.delete({ id });
  }
}
