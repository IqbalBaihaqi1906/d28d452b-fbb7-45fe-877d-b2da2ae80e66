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

  findAll() {
    return `This action returns all employee`;
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
