import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackendFormatter } from 'src/utils/Formatter/backEndFormatter';
import { Customer } from 'src/models/customer.entity';
import { Logger } from '@nestjs/common';
import { CustomersAction } from './customers.action';
import { Order } from 'src/models/purchase.entity';

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

  public async getCustomers(): Promise<any> {
    return await BackendFormatter.logger(this.customerRepository.find());
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

  public async getCustomerOrders(id: number): Promise<any> {
    return await BackendFormatter.logger(
      this.orderRepository.find({
        where: { customer_id: id },
        relations: ['product'],
      }),
    );
  }

  public async addOrder(orderData: any): Promise<any> {
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
      await this.orderRepository.save(newOrder);
    }
    return await BackendFormatter.logger(orderData);
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
