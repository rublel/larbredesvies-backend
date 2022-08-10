import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from 'src/models/category.entity';
import { Product } from 'src/models/product.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { Response } from 'src/utils/Formatter/response.entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('all')
  async getAllProducts(@Query() query): Promise<Response<Product[]>> {
    const response = await this.catalogService.getAllProducts(query);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('product')
  async getProduct(@Query('id') id: number): Promise<Response<Product>> {
    const response = await this.catalogService.getProduct(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('category')
  async getCategory(@Query('id') id: Category): Promise<Response<any>> {
    const response = await this.catalogService.getCategory(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('categories')
  async getCategories(): Promise<Response<any>> {
    const response = await this.catalogService.getCategories();
    return await FrontEndFormatter.format({ records: response });
  }

  @Post('category')
  async addCategory(
    @Body() categoryData: Category,
  ): Promise<Response<Category>> {
    const response = await this.catalogService.addCategory(categoryData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Post('product')
  async addProduct(@Body() productData: Product): Promise<Response<Product>> {
    const response = await this.catalogService.addProduct(productData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Put('product')
  async updateProduct(
    @Body() productData: Product,
  ): Promise<Response<Product>> {
    const response = await this.catalogService.updateProduct(productData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Delete('product')
  async deleteProduct(@Query('id') id: number): Promise<Response<Product>> {
    const response = await this.catalogService.deleteProduct(id);
    return await FrontEndFormatter.format({ records: response });
  }
}
