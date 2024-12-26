import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from './schema/bank.schema';
import { CustomerSchema } from 'src/customer/schema/customer.schema';
import { AccountSchema } from 'src/account/schema/account.schema';
import { CustomerService } from 'src/customer/customer.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }, { name: 'Account', schema: AccountSchema }])],
  controllers: [BankController],
  providers: [BankService, AccountService, CustomerService]
})
export class BankModule { }
