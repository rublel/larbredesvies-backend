import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';
import { Order } from 'src/models/purchase.entity';
import { validate } from 'email-validator';
import { log } from 'console';

@Injectable()
export class CustomerService extends CustomersAction {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly logger: Logger,
  ) {
    super(customerRepository, logger);
  }
  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;

  async getCustomers(query): Promise<{
    data: Customer[];
    total: number;
    perPage: number;
    pages: number;
  }> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const [result, total] = await this.customerRepository.findAndCount({
      order: { id: 'ASC' },
      take,
      skip,
    });
    return {
      data: result,
      total,
      perPage: take,
      pages: Math.ceil(total / take),
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
    console.log({ queryString, queryFilters });

    const take = queryFilters.take || 20;
    const skip = queryFilters.skip || 0;
    const [result, total] = await this.customerRepository.findAndCount({
      where: [
        { name: Like(`%${queryString}%`) },
        { siret: Like(`%${queryString}%`) },
        { email: Like(`%${queryString}%`) },
      ],
      order: { date_creation: 'DESC' },
      take: take,
      skip: skip,
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

  public async addOrder(orderData: any): Promise<any> {
    if (!orderData.customer_id) {
      return { error: 'Customer ID is required' };
    }
    const maxId = await this.orderRepository.find({
      order: { id: 'DESC' },
    });
    const newId = +maxId[0]?.order_id?.slice(3) + 1 ?? 1;
    for (let i = 0; i < orderData.products.length; i++) {
      const newOrder = new Order();
      newOrder.order_id = `CMD${newId}`;
      newOrder.customer_id = orderData.customer_id;
      newOrder.product_id = orderData.products[i].product_id;
      newOrder.quantity = orderData.products[i].quantity;
      //! Check the price in the database and use it
      newOrder.price = orderData.products[i].price;
      newOrder.line = i + 1;
      newOrder.date = new Date().toISOString();
      newOrder.status = 'PENDING';
      await this.orderRepository.save(newOrder);
    }
    const order: Order[] = await this.orderRepository.find({
      where: { order_id: `CMD${newId}` },
    });
    this.logger.log(`Order with id ${newId} created`);
    this.logger.log(order);
    const transactionsById = order.reduce((acc, cur) => {
      if (!acc[cur.order_id]) {
        acc[cur.order_id] = [];
      }
      acc[cur.order_id].push(cur);
      return acc;
    }, {});
    return {
      products: transactionsById[`CMD${newId}`].length,
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
