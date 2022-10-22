import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { Transaction } from 'src/models/transaction.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Transaction])],
  controllers: [CustomerController],
  providers: [CustomerService, Logger],
  exports: [CustomerService],
})
export class CustomerModule {}
