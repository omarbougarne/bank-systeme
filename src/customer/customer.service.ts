import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';
// import { AccountService } from 'src/account/account.service';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>,
        // private accountService: AccountService

    ) { }

    async createAccount(createCustomer: CreateCustomerDto): Promise<Customer> {
        const { customerName, AccountNumber, address, phone, balance } = createCustomer

        const customer = await this.customerModule.create({
            customerName,
            AccountNumber,
            address,
            phone,
            balance

        })
        await customer.save()
        return customer;
    }

    // async deposit({ deposit, id }: DepositDto): Promise<Number> {

    // this.bankService.transaction(deposit, idReceiver, idSender)
    // this.accountService.updateAccount(this.accountService.checkAccount(id) + deposit);
    // return this.accountService.checkAccount(id);
    // }
    // async deposit({ deposit, id }: DepositDto): Promise<Customer> {

    //     const { balance } = await this.customerModule.findById(id);
    //     const newBalance = deposit + balance;
    //     const customer = await this.customerModule.findByIdAndUpdate(id, { balance: newBalance }, { new: true })

    //     return customer;
    // }

    // async withdraw({ withdraw, id }: WithDrawDto): Promise<Customer> {
    // const { balance } = await this.customerModule.findById(id);
    // const newBalance = balance - withdraw;
    // const customer = await this.customerModule.findByIdAndUpdate(id, { balance: newBalance }, { new: true })

    // return customer;
    // }

}
