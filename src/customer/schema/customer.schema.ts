import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Customer {

    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true, unique: true })
    AccountNumber: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ required: true, unique: true })
    balance: number;

    @Prop({})
    deposit: number;

    @Prop({})
    withdraw: number;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer)