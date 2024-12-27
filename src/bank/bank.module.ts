import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BankSchema } from './schema/bank.schema';
import { Customer, CustomerSchema } from 'src/customer/schema/customer.schema';
import { Account, AccountSchema } from 'src/account/schema/account.schema';
import { CustomerService } from 'src/customer/customer.service';
import { AccountService } from 'src/account/account.service';
import { map } from 'rxjs';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema },
  { name: Customer.name, schema: CustomerSchema },
  { name: Account.name, schema: AccountSchema }])],
  controllers: [BankController],
  providers: [BankService, AccountService, CustomerService]
})
export class BankModule { }




