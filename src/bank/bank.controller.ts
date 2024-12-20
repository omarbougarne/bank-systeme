import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BankService } from './bank.service';
import { Bank } from './schema/bank.schema';

@Controller('bank')
export class BankController {

    constructor(
        private bankService: BankService
    ) { }

    // @Get('/')

    @Post(':id/loan')
    async giveLoan(@Param('id')
    @Body() amount: number, id: string): Promise<Bank> {

        return this.bankService.giveLoan(id, amount)
    }

    @Post(':id/collect')
    async collectMoney(@Param('id') id: string,
        @Body() amount: number): Promise<Bank> {

        return this.bankService.collectMoney(id, amount)
    }


    @Patch('/:id')
    async updateDetails(@Param('id') id, @Body() { amount }) {
        return this.bankService.updateDetails(id, amount)
    }



}
