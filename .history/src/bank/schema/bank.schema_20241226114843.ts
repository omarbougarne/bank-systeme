import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Account } from "src/account/schema/account.schema";
import { Customer } from "src/customer/schema/customer.schema";

Schema({
    timestamps: true
})
export class Bank extends Document {


    @Prop({})
    bankName: string

    // @Prop({})
    // lonDetails: string;

    // @Prop({ unique: true })
    // transNo: string;

    // @Prop({})
    // transDate: Date;

    // @Prop({})
    // transTime: Date;

    // @Prop({ type: [{ type: Types.ObjectId, ref: 'Customer' }] })
    // customerD: Types.ObjectId[];



}

export const BankSchema = SchemaFactory.createForClass(Bank);