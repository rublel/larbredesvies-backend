import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';
import { Transaction } from 'src/models/transaction.entity';
import { validate } from 'email-validator';
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

  public async addCustomer(customer: Customer): Promise<any> {
    if (customer.email && customer.email.length > 0) {
      const checker = await this.checkIfExist(customer.email);
      if (!checker?.exist) {
        if (validate(customer.email)) {
          return await BackendFormatter.logger(
            this.customerRepository.save(customer),
          );
        } else {
          return {
            error: `L'email ${customer.email} n'est pas valide !`,
          };
        }
      } else {
        return {
          exist: false,
          error: `L'email ${customer.email} est déjà utilisé !`,
        };
      }
    } else {
      return {
        error: `Adresse email obligatoire !`,
      };
    }
  }

  public async getCustomerOrders(id: number): Promise<any> {
    const transactions = await BackendFormatter.logger(
      this.orderRepository.find({
        where: { customer_id: id },
      }),
    );
    const transactionsById = transactions.reduce((acc, cur) => {
      if (!acc[cur.order_id]) {
        acc[cur.order_id] = [];
      }
      acc[cur.order_id].push(cur);
      return acc;
    }, {});
    return {
      count: Object.keys(transactionsById).length,
      ...transactionsById,
    };
  }

  public async updateCustomer(customer: Customer): Promise<any> {
    return {
      ...(await this.customerRepository.update(customer.id, customer)),
      ...{
        response: await BackendFormatter.logger(this.getCustomer(customer.id)),
      },
    };
  }

  public async deleteCustomer(id: number): Promise<any> {
    return await BackendFormatter.logger(
      this.customerRepository.delete({ id }),
    );
  }
}
