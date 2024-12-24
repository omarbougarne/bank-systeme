import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {


    @IsNotEmpty()
    @IsString()
    customerName: string;
    accountNumber: string;
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: string;

    @IsNotEmpty()
    @IsNumber()
    balance: string;
}