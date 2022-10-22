import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './api/Catalog/catalog.module';
import { CustomerModule } from './api/Customers/customer.module';
import { TransactionModule } from './api/Transactions/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './models/category.entity';
import { Customer } from './models/customer.entity';
import { Product } from './models/product.entity';
import { Transaction } from './models/transaction.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASWORD,
      database: process.env.DB,
      entities: [Product, Customer, Transaction, Category],
      synchronize: true,
    }),
    CatalogModule,
    CustomerModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    console.log(
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_USERNAME,
      process.env.DB_PASWORD,
      process.env.DB,
    );
  }
}
