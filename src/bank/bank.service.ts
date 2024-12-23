import { Injectable } from '@nestjs/common';
import { BankModule } from './bank.module';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';
import { SharedService } from 'src/shared/shared.service';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {

    constructor(@InjectModel(Bank.name) private bankModule: Model<Bank>,
        private sharedService: SharedService,
        private accountService: AccountService
    ) { }

    async createBank({ bankName }: CreateBankDto) {
        await this.bankModule.create({
            bankName,
        })
    }
    async giveLoan(id, amount): Promise<Bank> {
        const account = await this.sharedService.checkAccount(id)
        const updatedBalance = account.balance + amount
        this.accountService.updateAccount(id, updatedBalance);

        const loan = await this.bankModule.findByIdAndUpdate(id, { lonDetails: updatedBalance }, { new: true });
        return loan
    }

    async collectMoney(id, amount): Promise<Bank> {
        const account = await this.sharedService.checkAccount(id)
        const updatedBalance = amount - account.balance
        this.accountService.updateAccount(id, updatedBalance);

        const collect = await this.bankModule.findByIdAndUpdate(id, { lonDetails: updatedBalance }, { new: true });
        return collect

    }

    async updateDetails(id, balance) {
        const customer_1 = await this.sharedService.checkAccount(id)
        const update = await this.bankModule.findByIdAndUpdate(id, { balance }).populate('customerDetails')
        return { customer_1, update }
    }

    async transactionDep(amount: number, id: string, deposit: string, idR: string, idS: string, balance: number): Promise<any> {

        const sender = await this.sharedService.checkAccount(idS);
        const receiver = await this.sharedService.checkAccount(idR);

        const detailsReceiver = await this.updateDetails(idR, balance + amount);


        const bank = await this.bankModule.findById(id).populate('customerDetails');

        return { detailsReceiver, bank };
    }


    async transactionWith(transactionDto: TransactionDto, idR, idS, balance): Promise<any> {

        const { amount } = transactionDto
        const sender = this.sharedService.checkAccount(idS);
        const receiver = this.sharedService.checkAccount(idR);

        const detailsSender = await this.updateDetails(sender, balance - amount);


        return { detailsSender };
    }

}
