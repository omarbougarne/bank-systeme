import { Customer } from "src/customer/schema/customer.schema";

export class CreatAccountDto {
    accountNo: Customer;
    balance: number;
    customer: Customer
}