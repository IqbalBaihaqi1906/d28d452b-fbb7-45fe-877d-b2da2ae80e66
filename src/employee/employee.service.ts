import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateEmployee,
  ICreateManyEmployees,
  IUpdateEmployee,
  IUpdateManyEmployees,
} from './interfaces/employee-interfaces';
import { In, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeParam: ICreateEmployee) {
    const isEmailExist = await this.employeeRepository.findOne({
      where: { email: createEmployeParam.email },
    });

    if (isEmailExist) {
      throw new BadRequestException('Email already exist');
    }

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

  async findById(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async updateById(id: number, updateEmployeeParam: IUpdateEmployee) {
    const employee = await this.findById(id);

    Object.assign(employee, updateEmployeeParam);

    return this.employeeRepository.save(employee);
  }

  async updateMany(updateManyParam: IUpdateManyEmployees) {
    const employeeIds = updateManyParam?.employees.map((item) => item.id);

    const employees = await this.employeeRepository.find({
      where: { id: In(employeeIds) },
    });

    if (employees.length !== updateManyParam.employees.length) {
      throw new NotFoundException('One of the employee not found');
    }

    employees.forEach((employee) => {
      const updateEmployee = updateManyParam.employees.find(
        (e) => e.id === employee.id,
      );
      Object.assign(employee, updateEmployee);
    });

    return this.employeeRepository.save(employees);
  }

  async deleteById(id: number) {
    const employee = await this.findById(id);

    const result = await this.employeeRepository.delete(employee.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return result;
  }
}
