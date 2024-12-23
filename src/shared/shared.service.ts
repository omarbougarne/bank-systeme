import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/account/schema/account.schema';

@Injectable()
export class SharedService {

    constructor(@InjectModel(Account.name) private accountModule: Model<Account>,
        // @Inject(forwardRef(() => CustomerService))
        // private customerService: CustomerService,
    ) { }

    checkAccount(id: string) {
        return this.accountModule.findById(id);
    }
}
