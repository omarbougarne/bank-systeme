import { Injectable } from '@nestjs/common';
import { BankModule } from './bank.module';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schema/bank.schema';
import { Model } from 'mongoose';
import { Customer } from 'src/customer/schema/customer.schema';
import { TransactionDto } from './dto/transaction.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CustomerTransDto } from 'src/customer/dto/transaction-customer.dto';

@Injectable()
export class BankService {

    constructor(@InjectModel(Bank.name) private bankModule: Model<Bank>,
        @InjectModel(Customer.name) private customerModule: Model<Bank>) { }


    async getBalance(id): Promise<Bank> {

        let balance = this.bankModule.findById(id, { path: 'Customer', select: 'balance' })
        return balance
    }

    async getDeposit(id): Promise<Bank> {

        let deposit = this.bankModule.findById(id, { path: 'Customer', select: 'deposit' })
        return deposit
    }
    async calculateTransAmount(getBalance, getDeposit) {
        let amount = getBalance + getDeposit
        return amount
    }
    async transaction({ id, transaction }: TransactionDto, { cust_id, balance, deposit }: CustomerTransDto): Promise<Bank> {


        let customer_1 = this.getBalance(id)

        let customer_2 = this.getDeposit(id)

        let calculate = this.calculateTransAmount(customer_1, customer_2)

        let trans = (await this.bankModule.findByIdAndUpdate(id).populate({ path: 'Customer', select: 'balance' }))





        return trans;
    }


}
