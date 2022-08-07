import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './api/Catalog/catalog.module';
import { CustomerModule } from './api/Customers/customer.module';
import { TransactionModule } from './api/Transactions/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './models/customer.entity';
import { Product } from './models/product.entity';
import { Transaction } from './models/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.caotopuibznb.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'bOMwVJ7kVNDg3jjl',
      database: 'webapp',
      entities: [Product, Customer, Transaction],
      synchronize: true,
    }),
    CatalogModule,
    CustomerModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
