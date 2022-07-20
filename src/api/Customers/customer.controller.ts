import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Customer } from 'src/models/customer.entity';
import FrontEndFormatter from 'src/utils/Formatter/frontEndFormatter';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomer(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.getCustomer(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Get('purchase')
  async getCustomerPurchase(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.getCustomerOrders(id);
    return await FrontEndFormatter.format({ records: response });
  }

  @Post()
  async addCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.addCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Post('order')
  async addPurchase(@Body() purchaseData: any): Promise<any> {
    const response = await this.customerService.addOrder(purchaseData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Put()
  async updateCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.updateCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Delete()
  async deleteCustomer(@Query('id') id: number): Promise<any> {
    const response = await this.customerService.deleteCustomer(id);
    return await FrontEndFormatter.format({ records: response });
  }
}
