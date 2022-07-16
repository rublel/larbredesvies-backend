import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogModule } from './api/Catalog/catalog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      entities: [],
      synchronize: true,
    }),
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
