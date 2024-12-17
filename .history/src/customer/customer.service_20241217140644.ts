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
        const { customerName, AccountNumber, address, phone, balance } = createCustomer

        const customer = await this.customerModule.create({
            createCustomer

        })
        await customer.save()
        return customer;
    }

    async deposit(depositDto: DepositDto, id): Promise<Customer> {

        let dep = depositDto.deposit
        let bal = depositDto.balance
        let newBalance = await this.customerModule.findByIdAndUpdate(
            id,

            { new: true }

        );

        return newBalance;
    }
    // const transactionSession = await mongoose.startSession();
    // transactionSession.startTransaction();

    // try
    // {
    //   const newSignupBody: CreateUserDto = {password: hashedPassword, email, username};

    //   const user: User = await this.userService.create(newSignupBody);

    //   //save the profile.
    //   const profile: Profile = await this.profileService.create(user['Id'], signupDto);

    //   const result:AuthResponseDto = this.getAuthUserResponse(user, profile);

    //   transactionSession.commitTransaction();
    //   return result;
    // }
    // catch(err)
    // {
    //   transactionSession.abortTransaction();
    // }
    // finally
    // {
    //   transactionSession.endSession();
    // }

    async withdraw(withDrawDto: WithDrawDto, id): Promise<Customer> {
        const customer = await this.customerModule.findByIdAndUpdate(id, withDrawDto);



        return customer;
    }

}