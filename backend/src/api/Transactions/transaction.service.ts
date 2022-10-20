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
  ): Promise<Transaction[] | Response<string>> {
    if (!orderData.customer_id) {
      return { error: 'Customer ID is required' };
    }
    const maxId = await this.transactionRepository.find({
      order: { id: 'DESC' },
    });
    const newId = `CMD00${+maxId[0]?.order_id?.slice(5) + 1 || 1}`;
    orderData?.products?.length
      ? await Promise.all(
          orderData.products.map(async (product, i) => {
            await this.transactionRepository.save(
              new Transaction({
                order_id: newId,
                customer_id: orderData.customer_id,
                product_id: orderData.products[i].product_id,
                quantity: orderData.products[i].quantity,
                //! Check the price in the database and use it
                price: orderData.products[i].price,
                total: orderData.total,
                line: i + 1,
              }),
            );
          }),
        )
      : await this.transactionRepository.save(
          new Transaction({
            order_id: newId,
            customer_id: orderData.customer_id,
            product_id: orderData.product_id || 99999,
            quantity: orderData.quantity,
            price: orderData.price,
            total: orderData.total,
            type: 'GLOBAL_ORDER',
          }),
        );
    this.logger.log(`Order with id ${newId} created`, 'Transaction');
    return this.transactionRepository.find({
      where: { order_id: newId },
    });
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
