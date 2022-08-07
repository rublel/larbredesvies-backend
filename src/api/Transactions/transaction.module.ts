import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { Transaction } from 'src/models/transaction.entity';
import { CustomerService } from '../Customers/customer.service';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Customer])],
  controllers: [TransactionsController],
  providers: [TransactionsService, CustomerService, Logger],
  exports: [TransactionsService],
})
export class TransactionModule {}
