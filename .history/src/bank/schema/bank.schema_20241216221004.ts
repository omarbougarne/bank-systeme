import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

Schema({
    timestamps: true
})
export class Bank {

    @Prop({})
    lonDetails: string;

    @Prop({ unique: true })
    transNo: string;

    @Prop({})
    transDate: Date;

    @Prop({})
    transTime: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Customer' }], required: false })
    customerDetails: []

}

export const BankSchema = SchemaFactory.createForClass(Bank);