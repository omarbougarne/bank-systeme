import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAccountDto {


    @IsNotEmpty()
    @IsString()
    customerName: string;

    @IsNotEmpty()
    @IsString()
    AccountNumber: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: string;
}