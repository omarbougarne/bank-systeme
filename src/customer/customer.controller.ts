import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';

@Controller('customers')
export class CustomerController {

    constructor(
        private customerService: CustomerService
    ) { }


    @Get('/')
    getCustomers(@Body() createCustomer: CreateCustomerDto) {
        return this.customerService.createAccount(createCustomer);
    }

    @Post('/')
    createCustomer(@Body() createCustomer: CreateCustomerDto) {
        return this.customerService.createAccount(createCustomer);
    }

    // @Get('/:id')
    // getCustumer(@Param('id') id: string, @Body() depoDto: DepositDto) {
    //     return this.customerService.deposit(depoDto);
    // }
    // @Patch('/:id')
    // updateCustomer(@Param('id') id: string, withDto: WithDrawDto) {
    //     return this.customerService.withdraw(withDto);
    // }
}
