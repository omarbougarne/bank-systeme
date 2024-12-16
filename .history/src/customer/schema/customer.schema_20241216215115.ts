import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Customer {

    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    AccountNumber: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    hone: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer)