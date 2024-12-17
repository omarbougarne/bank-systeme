import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DepositDto } from './dto/deposit.dto';
import { CustomerModule } from './customer.module';
import { WithDrawDto } from './dto/withdraw.dto';
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

    async deposit(depositDto: DepositDto, id): Promise<Customer> {

        const customer = await this.customerModule.findByIdAndUpdate(id, depositDto.balance += depositDto.deposit, { new: true });



        return customer;
    }


    async withdraw(withDrawDto: WithDrawDto, id): Promise<Customer> {
        const customer = await this.customerModule.findByIdAndUpdate(id, withDrawDto);



        return customer;
    }

}
