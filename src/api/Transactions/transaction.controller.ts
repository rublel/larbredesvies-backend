import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'src/models/transaction.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { TransactionsService } from './transaction.service';
import { CustomerService } from '../Customers/customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly customerService: CustomerService,
  ) {}
  @Get()
  async getCustomerPurchase(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.getCustomerOrders(id);
    return await FrontEndFormatter.format({ records: response });
  }
  @Post()
  async addTransaction(@Body() transaction: Transaction): Promise<any> {
    const response = await this.transactionsService.addTransaction(transaction);
    return await FrontEndFormatter.format({ records: response });
  }
}
