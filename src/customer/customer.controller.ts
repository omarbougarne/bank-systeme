import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';
import { TransactionDto } from 'src/bank/dto/transaction.dto';

@Controller('customers')
export class CustomerController {

    constructor(
        private customerService: CustomerService
    ) { }


    @Get('/')
    getCustomers() {
        return this.customerService.getCustomers();
    }
    @Get('/:id')
    getCustomer(@Param('id') id) {
        return this.customerService.getCustomer(id);
    }

    @Post('/')
    createCustomer(@Body() createCustomer: CreateCustomerDto, balance) {
        return this.customerService.createAccount(createCustomer, balance);
    }


    @Post(':id/deposit')
    async depositCredit(@Param('id') id: string,
        @Body() depositDto: DepositDto,
        @Body() amount: number): Promise<any> {
        return this.customerService.deposit(depositDto, id, amount, depositDto.idS, depositDto.idR);
    }


    @Post(':id/withdraw')
    async withDrawCredit(@Param('id')
    @Body() withdrawDto: WithDrawDto,
        @Body() id: TransactionDto,): Promise<any> {

        return this.customerService.withdraw(withdrawDto, id)
    }


}
