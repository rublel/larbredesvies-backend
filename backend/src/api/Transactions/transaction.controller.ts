import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Transaction } from 'src/models/transaction.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { TransactionsService } from './transaction.service';
import { CustomerService } from '../Customers/customer.service';
import { Response } from 'src/utils/Formatter/response.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getCustomerTransactions(
    @Query('id') id: number,
  ): Promise<Response<{}>> {
    const response = await this.transactionsService.getCustomerTransactions(id);
    return await FrontEndFormatter.format({ records: response });
  }

  // @Get('all')
  // async getTransactions(@Query() query): Promise<any> {
  //   const response = await this.transactionsService.getTransactions(query);
  //   return await FrontEndFormatter.format({ records: response });
  // }

  @Post()
  async addTransaction(
    @Body() transaction: Transaction,
  ): Promise<Response<{}>> {
    const response = await this.transactionsService.addTransaction(transaction);
    return await FrontEndFormatter.format({ records: response });
  }
}
