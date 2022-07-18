import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './api/Catalog/catalog.module';
import { CustomerModule } from './api/Customers/customer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './models/customer.entity';
import { Product } from './models/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '34.155.116.231',
      port: 3306,
      username: 'admin',
      password: '(UM_YkQ-RA._@z{B',
      database: 'larbredesvies',
      entities: [Product, Customer],
      synchronize: true,
    }),
    CatalogModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
