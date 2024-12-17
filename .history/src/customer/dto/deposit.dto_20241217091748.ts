import { IsNotEmpty, IsNumber } from "class-validator";

export class DepositDto {
    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @IsNotEmpty()
    @IsNumber()
    deposit: number;

}