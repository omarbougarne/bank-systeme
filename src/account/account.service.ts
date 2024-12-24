import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schema/account.schema';
import { CreatAccountDto } from './dto/create-account.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AccountService {

    constructor(@InjectModel(Account.name) private accountModule: Model<Account>,
        @Inject(forwardRef(() => CustomerService))
        private customerService: CustomerService,
    ) { }

    getAccounts() {
        return this.accountModule.find();

    }

    checkAccount(id: string) {
        return this.accountModule.findById(id);
    }
    updateAccount(id: string, updatedBalance: number) {
        this.accountModule.findByIdAndUpdate(id, { balance: updatedBalance })
    }

    // checkAccount(id: string) {
    //     return this.accountModule.findById(id);
    // }

    async makeAccount(accountNo, customerName, { balance }: CreatAccountDto,) {

        const account = (await this.accountModule.create({ accountNo, customerName, balance }))
        await account.populate('customer');
        await account.save()
        return account
    }

}
