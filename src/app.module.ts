import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './api/Catalog/catalog.module';
import { CustomerModule } from './api/Customers/customer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './models/customer.entity';
import { Product } from './models/product.entity';
import { Order } from './models/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.caotopuibznb.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'bOMwVJ7kVNDg3jjl',
      database: 'webapp',
      entities: [Product, Customer, Order],
      synchronize: true,
    }),
    CatalogModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
