import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) { }

}
