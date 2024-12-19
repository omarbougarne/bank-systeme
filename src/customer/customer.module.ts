import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
import { AccountSchema } from 'src/account/schema/account.schema';
import { BankService } from 'src/bank/bank.service';
import { AccountService } from 'src/account/account.service';
import { BankSchema } from 'src/bank/schema/bank.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }, { name: 'Account', schema: AccountSchema }, { name: 'Bank', schema: BankSchema },])],
  controllers: [CustomerController],
  providers: [CustomerService, BankService, AccountService]
})
export class CustomerModule { }
