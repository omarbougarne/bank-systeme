import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Customer {

    @Prop({ required: false })
    customerName: string;

    @Prop({ required: true, unique: true })
    accountNo: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, unique: true })
    phone: string;




}

export const CustomerSchema = SchemaFactory.createForClass(Customer)