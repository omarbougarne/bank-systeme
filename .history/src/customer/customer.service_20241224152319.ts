import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithDrawDto } from './dto/withdraw.dto';
import { BankService } from 'src/bank/bank.service';
import { AccountService } from 'src/account/account.service';
import { TransactionDto } from 'src/bank/dto/transaction.dto';
import { ModuleRef } from '@nestjs/core';
@Injectable()
export class CustomerService implements OnModuleInit {

    private accountService: AccountService;
    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>,
        private bankService: BankService,
        private moduleRef: ModuleRef

    ) { }
    onModuleInit() {
        this.accountService = this.moduleRef.get(AccountService);
    }

    async getCustomers(): Promise<Customer[]> {
        const customers = await this.customerModule.find()
        return customers
    }

    async getCustomer(id): Promise<Customer> {
        const customer = await this.customerModule.findById(id)
        return customer
    }
    async createAccount(createCustomer: CreateCustomerDto, balance): Promise<Customer> {
        const { customerName, accountNumber, address, phone } = createCustomer

        const customer = await this.customerModule.create({
            customerName,
            accountNumber,
            address,
            phone,

        })
        const account = await this.accountService.makeAccount(customerName, accountNumber, balance)
        // console.log(balance)
        // console.log(account)
        await customer.save()


        return customer;
    }

    async deposit(depositDto: DepositDto, id: string, amount: number, idS: string, idR: string): Promise<any> {
        const { deposit } = depositDto;

        const sender = await this.accountService.checkAccount(idS);
        const receiver = await this.accountService.checkAccount(idR);

        const trans = await this.bankService.transactionDep(amount, id, deposit, idR, idS, receiver.balance);

        return trans;
    }

    async withdraw(withdrawDto: WithDrawDto, id: TransactionDto): Promise<any> {
        const { withdraw, idR, idS } = withdrawDto;
        const sender = this.accountService.checkAccount(idS);
        const receiver = this.accountService.checkAccount(idR);

        const trans = this.bankService.transactionWith(id, withdraw, sender, receiver)

        const bank = (await this.customerModule.findById(id)).populate('bank')

        return { trans, bank }
    }
}






















