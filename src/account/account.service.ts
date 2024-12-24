import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schema/account.schema';
// import { CreatAccountDto } from './dto/create-account.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AccountService {

    constructor(@InjectModel(Account.name) private accountModule: Model<Account>
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



    async makeAccount(customerName, accountNo, balance) {

        const account = new this.accountModule({ customerName, accountNo, balance })
        await account.populate('customerName');
        await account.save()
        return account
    }

}
