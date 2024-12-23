import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';
import { BankService } from 'src/bank/bank.service';
import { AccountService } from 'src/account/account.service';
import { TransactionDto } from 'src/bank/dto/transaction.dto';
import { SharedService } from 'src/shared/shared.service';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>,
        private bankService: BankService,

        private sharedService: SharedService

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
        const { customerName, address, phone } = createCustomer

        const customer = await this.customerModule.create({
            customerName,
            // accountNumber,
            address,
            phone,

        })
        await customer.save()
        return customer;
    }

    async deposit(depositDto: DepositDto, id: string, amount: number, idS: string, idR: string): Promise<any> {
        const { deposit } = depositDto;


        const sender = await this.sharedService.checkAccount(idS);
        const receiver = await this.sharedService.checkAccount(idR);


        const trans = await this.bankService.transactionDep(amount, id, deposit, idR, idS, receiver.balance);

        return trans;
    }

    async withdraw(withdrawDto: WithDrawDto, id: TransactionDto): Promise<any> {
        const { withdraw, idR, idS } = withdrawDto;
        const sender = this.sharedService.checkAccount(idS);
        const receiver = this.sharedService.checkAccount(idR);

        const trans = this.bankService.transactionWith(id, withdraw, sender, receiver)

        const bank = (await this.customerModule.findById(id)).populate('bank')

        return { trans, bank }
    }
}






















