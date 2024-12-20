import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountService } from './account.service';


@Controller('bank')
export class BankController {
    private accountService: AccountService
    @Get('/:id')
    checkAccount(@Param('id') id) {
        return this.accountService.checkAccount(id)
    }
    // @Get('/')

    // @Post('/')


    // @Patch('/:id')


    // @Delete('/:id')


}
