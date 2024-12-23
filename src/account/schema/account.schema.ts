import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Customer } from "src/customer/schema/customer.schema";

@Schema({ timestamps: true })
export class Account {

    @Prop({ required: true, unique: true })
    accountNo: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Customer' }], required: true })
    customer: Customer

    @Prop({ required: true, unique: false })
    balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account)