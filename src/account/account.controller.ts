import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreatAccountDto } from 'src/account/dto/create-account.dto';
import { SharedService } from 'src/shared/shared.service';


@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService,
        private sharedService: SharedService) { }

    @Get('/:id')
    checkAccount(@Param('id') id) {
        return this.sharedService.checkAccount(id)
    }
    // @Get('/')

    @Post('/')
    async makeAccount(@Body() { accountNo, balance, customer }: CreatAccountDto) {
        return await this.accountService.makeAccount({ accountNo, balance, customer })
    }


    @Patch('/:id')
    updateAccount(@Param('id') id, @Body() updatedBalance: number) {
        return this.accountService.updateAccount(id, updatedBalance)
    }


    // @Delete('/:id')


}
