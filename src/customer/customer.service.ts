import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';
import { BankService } from 'src/bank/bank.service';
import { AccountService } from 'src/account/account.service';
import { TransactionDto } from 'src/bank/dto/transaction.dto';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>,
        private bankService: BankService,
        private accountService: AccountService

    ) { }

    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customerModule.find()
        return customers
    }

    async getCustomer(id): Promise<Customer> {
        const customer = await this.customerModule.findById(id)
        return customer
    }
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

    async deposit(depositDto: DepositDto, id: TransactionDto): Promise<any> {
        const { deposit, idR, idS } = depositDto
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        const trans = this.bankService.transactionDep(id, deposit, sender, receiver)

        return trans
    }
    async withdraw(withdrawDto: WithDrawDto, id: TransactionDto): Promise<any> {
        const { withdraw, idR, idS } = withdrawDto;
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        const trans = this.bankService.transactionWith(id, withdraw, sender, receiver)

        return trans
    }
}
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


