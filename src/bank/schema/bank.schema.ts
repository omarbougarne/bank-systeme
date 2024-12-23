import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Customer } from "src/customer/schema/customer.schema";

Schema({
    timestamps: true
})
export class Bank {


    @Prop({})
    bankName: string
    @Prop({})
    lonDetails: string;

    @Prop({ unique: true })
    transNo: string;

    @Prop({})
    transDate: Date;

    @Prop({})
    transTime: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Customer' }], required: false, unique: false })
    customerDetails: Customer;



}

export const BankSchema = SchemaFactory.createForClass(Bank);