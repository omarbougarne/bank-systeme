import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schema/customer.schema';
import { AccountSchema } from 'src/account/schema/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }, { name: 'Account', schema: AccountSchema }])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }
