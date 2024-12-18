import { Injectable } from '@nestjs/common';
import { BankModule } from './bank.module';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { Customer } from 'src/customer/schema/customer.schema';
import { TransactionDto } from './dto/transaction.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CustomerTransDto } from 'src/customer/dto/transaction-customer.dto';
import { AccountModule } from 'src/account/account.module';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/schema/account.schema';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class BankService {

    constructor(@InjectModel(Bank.name) private bankModule: Model<Bank>,
        private accountService: AccountService,
        private customerService: CustomerService
    ) { }


    async giveLoan(id, amount): Promise<Bank> {
        const account = await this.accountService.checkAccount(id)
        const updatedBalance = account.balance + amount
        this.accountService.updateAccount(id, updatedBalance);

        const loan = await this.bankModule.findByIdAndUpdate(id, { lonDetails: updatedBalance }, { new: true });
        return loan
    }

    async collectMoney(id, amount): Promise<Bank> {
        const account = await this.accountService.checkAccount(id)
        const updatedBalance = amount - account.balance
        this.accountService.updateAccount(id, updatedBalance);

        const collect = await this.bankModule.findByIdAndUpdate(id, { lonDetails: updatedBalance }, { new: true });
        return collect


    }
    async updateDetails(idR, idS) {
        const customer_1 = (await this.accountService.checkAccount(idR)).populate('customerDetails')
        const customer_2 = (await this.accountService.checkAccount(idS)).populate('customerDetails')
        return { customer_1, customer_2 }
    }
    async transaction({ id, transaction, amount }: TransactionDto): Promise<number> {
        this.giveLoan(id, amount)
        this.collectMoney(id, amount)
        // this.updateDetails()
        // Bank({ trans })
        const trans = 123456789;
        return trans;
    }

}
