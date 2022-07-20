import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/models/customer.entity';
import { Order } from 'src/models/purchase.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Order])],
  controllers: [CustomerController],
  providers: [CustomerService, Logger],
  exports: [CustomerService],
})
export class CustomerModule {}
