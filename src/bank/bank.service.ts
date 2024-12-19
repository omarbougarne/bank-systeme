import { Injectable } from '@nestjs/common';
import { BankModule } from './bank.module';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class BankService {

    constructor(@InjectModel(Bank.name) private bankModule: Model<Bank>,
        private accountService: AccountService
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

    async updateDetails(id, balance) {
        const customer_1 = (await this.accountService.checkAccount(id).findByIdAndUpdate(id, balance)).populate('customerDetails')
        return { customer_1 }
    }

    async transactionDep({ amount }: TransactionDto, idR, idS, balance): Promise<any> {
        // const loan = this.giveLoan(id, amount)
        // const collect = this.collectMoney(id, amount)
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        // const detailsSender = await this.updateDetails(sender, balance - amount);
        const detailsReceiver = await this.updateDetails(receiver, balance + amount);

        return { detailsReceiver };
    }

    async transactionWith(transactionDto: TransactionDto, idR, idS, balance): Promise<any> {
        // const loan = this.giveLoan(id, amount)
        // const collect = this.collectMoney(id, amount)
        const { id, transaction, amount } = transactionDto
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        const detailsSender = await this.updateDetails(sender, balance - amount);
        // const detailsReceiver = await this.updateDetails(receiver, balance + amount);

        return { detailsSender };
    }

}
