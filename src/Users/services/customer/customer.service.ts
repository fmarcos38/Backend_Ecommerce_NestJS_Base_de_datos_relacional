import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/Users/dtos/customer.dto';
import { Customers } from 'src/Users/entities/customers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customers) private customerRepository: Repository<Customers>) {}

    async findAll() {
        const customers = await this.customerRepository.find();
        if(customers[0] == null) {
            return 'No hay clientes';
        }
        return customers;
    }

    async findOne(id: number) {
        const customer = await this.customerRepository.findOneBy({id});

        if(!customer) {
            throw new HttpException("El cliente no existe", HttpStatus.BAD_REQUEST);
        }

        return customer;
    }

    async create(data: CreateCustomerDto) {
        //busco si el customer ya existe
        const customer = await this.customerRepository.findOne({where: {name: data.name, lastName: data.lastName}});
        if(customer) {
            throw new HttpException("El cliente ya existe", HttpStatus.BAD_REQUEST);
        }
        const newCustomer = this.customerRepository.create(data);
        await this.customerRepository.save(newCustomer);
        return {
            message: 'Cliente creado',
            newCustomer
        };
    }

    async update(id: number, changes: UpdateCustomerDto) {
        const customer = await this.customerRepository.findOneBy({id});
        if(!customer) {
            throw new HttpException("El cliente no existe", HttpStatus.BAD_REQUEST);
        }
        this.customerRepository.merge(customer, changes);
        return this.customerRepository.save(customer);
    }

    async remove(id: string): Promise<void> {
        await this.customerRepository.delete(id);
    }
}
