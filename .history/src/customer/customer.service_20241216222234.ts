import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schema/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModule: Model<Customer>) { }

    async addCustomer(createCustomer: CreateCustomerDto): Promise<Customer> {
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

}