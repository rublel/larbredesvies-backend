import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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

  @Post()
  async addCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.addCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }

  @Put()
  async updateCustomer(@Body() customerData: Customer): Promise<any> {
    const response = await this.customerService.updateCustomer(customerData);
    return await FrontEndFormatter.format({ records: response });
  }
}
