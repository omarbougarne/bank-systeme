import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Customer } from "src/customer/schema/customer.schema";

@Schema({ timestamps: true })
export class Account {

    @Prop({ required: true, unique: true })
    accountNo: string

    @Prop({ required: true })
    customerName: string

    @Prop({ required: false, unique: false, dafault: true })
    balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account)