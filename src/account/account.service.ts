import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './schema/account.schema';

@Injectable()
export class AccountService {

    constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

    updateAccount(id: string, updatedBalance: number) {
        this.accountModel.findByIdAndUpdate({ balance: updatedBalance })
    }

    checkAccount(id: string) {
        return this.accountModel.findById(id);
    }

}
