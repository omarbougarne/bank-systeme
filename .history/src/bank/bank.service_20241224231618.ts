import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';
import { ModuleRef } from '@nestjs/core';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class BankService {
    private customerService: CustomerService;
    constructor(@InjectModel(Bank.name) private bankModule: Model<Bank>,
        private accountService: AccountService,
        private moduleRef: ModuleRef,


    ) { }
    onModuleInit() {
        this.customerService = this.moduleRef.get(CustomerService);
    }

    async createBank(bankName: string): Promise<Bank> {
        const customers = await this.customerService.getCustomers()
        const create = await this.bankModule.create({
            bankName,
            customerDetails: customers
        })

        create.populate('customerDetails');
        await create.save()


        // const populate = await this.bankModule.findById(create._id).populate('customerDetails');
        // console.log(populate);
        return create
    }
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
        const customer_1 = await this.accountService.checkAccount(id)
        const update = await this.bankModule.findByIdAndUpdate(id, { balance }).populate('customerDetails')
        return { customer_1, update }
    }

    async transactionDep(amount: number, id: string, deposit: string, idR: string, idS: string, balance: number): Promise<any> {

        const sender = await this.accountService.checkAccount(idS);
        const receiver = await this.accountService.checkAccount(idR);
        const detailsReceiver = await this.updateDetails(idR, balance + amount);

        const bank = await this.bankModule.findById(id).populate('customerDetails');

        return { detailsReceiver, bank };
    }

    async transactionWith(transactionDto: TransactionDto, idR, idS, balance): Promise<any> {

        const { amount } = transactionDto
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        const detailsSender = await this.updateDetails(sender, balance - amount);

        return { detailsSender };
    }

}
