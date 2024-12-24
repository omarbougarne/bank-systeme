import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountService } from './account.service';


@Controller('account')
export class AccountController {
    constructor(
        private accountService: AccountService) { }

    @Get('/:id')
    checkAccount(@Param('id') id) {
        return this.accountService.checkAccount(id)
    }

    @Patch('/:id')
    updateAccount(@Param('id') id, @Body() updatedBalance: number) {
        return this.accountService.updateAccount(id, updatedBalance)
    }




    // @Get('/')

    // @Post('/')
    // async makeAccount(@Body() { accountNo, balance, customer }: CreatAccountDto) {
    //     return await this.accountService.makeAccount({ accountNo, balance, customer })
    // }

    // @Delete('/:id')
}
