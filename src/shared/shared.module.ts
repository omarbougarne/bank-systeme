import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/account/schema/account.schema';
import { CustomerSchema } from 'src/customer/schema/customer.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }, { name: 'Account', schema: AccountSchema }])],
    controllers: [SharedController],
    providers: [SharedService]
})
export class SharedModule { }
