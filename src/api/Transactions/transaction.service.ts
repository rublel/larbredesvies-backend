import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Response } from 'src/utils/Formatter/response.entity';

export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly logger: Logger,
  ) {}

  public async addTransaction(
    orderData: any,
  ): Promise<{ [key: string]: string | number }> {
    if (!orderData.customer_id) {
      return { error: 'Customer ID is required' };
    }
    const maxId = await this.transactionRepository.find({
      order: { id: 'DESC' },
    });
    const newId = `CMD00${+maxId[0]?.order_id?.slice(5) + 1 || 1}`;
    if (orderData.products && orderData.products.length > 0) {
      for (let i = 0; i < orderData.products.length; i++) {
        const newOrder = new Transaction();
        newOrder.order_id = newId;
        newOrder.customer_id = orderData.customer_id;
        newOrder.product_id = orderData.products[i].product_id;
        newOrder.quantity = orderData.products[i].quantity;
        //! Check the price in the database and use it
        newOrder.price = orderData.products[i].price;
        newOrder.total = orderData.total;
        newOrder.line = i + 1;
        newOrder.date = new Date().toISOString();
        newOrder.status = 'PENDING';
        await this.transactionRepository.save(newOrder);
      }
    } else {
      const newOrder = new Transaction();
      newOrder.order_id = newId;
      newOrder.customer_id = orderData.customer_id;
      newOrder.product_id = 99999;
      newOrder.quantity = orderData.quantity;
      newOrder.total = newOrder.price = orderData.total;
      newOrder.status = 'PENDING';
      newOrder.line = 1;
      newOrder.date = new Date().toISOString();
      await this.transactionRepository.save(newOrder);
    }
    const order: Transaction[] = await this.transactionRepository
      .find({
        where: { order_id: newId },
      })
      .then((res) => res)
      .catch((err) => err);
    this.logger.log(`Order with id ${newId} created`);
    this.logger.log(order);
    const transactionsById: { [key: string]: Transaction[] } = order.reduce(
      (acc, cur) => {
        if (!acc[cur.order_id]) {
          acc[cur.order_id] = [];
        }
        acc[cur.order_id].push(cur);
        return acc;
      },
      {},
    );
    return {
      products: transactionsById[newId].length,
      ...transactionsById,
    };
  }

  public async getCustomerTransactions(
    id: number,
  ): Promise<{ [key: string]: string | number }> {
    const transactions = await this.transactionRepository.find({
      where: { customer_id: id },
    });
    const transactionsById: { [key: string]: Transaction[] } =
      transactions.reduce((acc, cur) => {
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
}
