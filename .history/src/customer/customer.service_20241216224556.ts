import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { CustomerModule } from './customer.module';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>) { }

    async createAccount(createCustomer: CreateCustomerDto): Promise<Customer> {
        const { customerName, AccountNumber, address, phone } = createCustomer

        const customer = await this.customerModule.create({
            customerName,
            AccountNumber,
            address,
            phone

        })
        await customer.save()
        return customer;
    }

    async deposit(depositDto: DepositDto): Promise<Customer> {
        const customer = await this.customerModule.findById('id');

        const balance = customer.balance


        return customer;
    }


    // async withdraw(): Promise<> {
    //     const amount = 0;
    //     return amount;
    // }

}
