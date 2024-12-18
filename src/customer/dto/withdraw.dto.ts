import { IsNotEmpty, IsNumber } from "class-validator";

export class WithDrawDto {


    @IsNotEmpty()
    @IsNumber()
    withdraw: number;

    id: string;
}