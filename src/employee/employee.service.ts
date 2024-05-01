import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ICreateEmployee,
  ICreateManyEmployees,
} from './interfaces/employee-interfaces';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeParam: ICreateEmployee) {
    const newEmployee = await this.employeeRepository.save(createEmployeParam);
    return newEmployee;
  }

  async createMany(createManyParam: ICreateManyEmployees) {
    const newEmployees = await this.employeeRepository.save(
      createManyParam.employees,
    );
    return newEmployees;
  }

  async findAll(sortBy?: string, sortOrder?: string, page = 1, limit = 10) {
    const conditions = {
      take: limit,
      skip: (page - 1) * limit,
    };
    if (sortBy && sortOrder) {
      conditions['order'] = { [sortBy]: sortOrder };
    }

    const [data, total] =
      await this.employeeRepository.findAndCount(conditions);

    const totalPages = Math.ceil(total / limit);

    const perPage = limit;

    return { data, total, totalPages, perPage };
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `${id}, ${updateEmployeeDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
