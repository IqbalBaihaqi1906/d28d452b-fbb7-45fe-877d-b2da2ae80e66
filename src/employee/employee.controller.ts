import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateManyEmployeeDto } from './dto/create-many-employee.dto';
import { UpdateManyEmployeeDto } from './dto/update-many-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = await this.employeeService.create(createEmployeeDto);

    return {
      message: 'Employee created successfully',
      status: HttpStatus.CREATED,
      data: newEmployee.id,
    };
  }

  @Post('many')
  @UsePipes(new ValidationPipe())
  async createMany(@Body() createManyEmployeesDto: CreateManyEmployeeDto) {
    const newEmployees = await this.employeeService.createMany(
      createManyEmployeesDto,
    );

    return {
      message: 'Employee created successfully',
      status: HttpStatus.CREATED,
      newEmployees,
    };
  }

  @Get()
  async findAll(
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    const employees = await this.employeeService.findAll(
      sortBy,
      sortOrder,
      page,
      limit,
    );

    return {
      message: 'Employees retrieved successfully',
      status: HttpStatus.OK,
      data: employees,
    };
  }

  @Patch('/many')
  @UsePipes(new ValidationPipe())
  async updateMany(@Body() updateManyEmployeeDto: UpdateManyEmployeeDto) {
    const updatedEmployees = await this.employeeService.updateMany(
      updateManyEmployeeDto,
    );

    return {
      message: 'Employees updated successfully',
      status: HttpStatus.OK,
      data: updatedEmployees.map((employee) => employee.id),
    };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const updatedEmployee = await this.employeeService.updateById(
      id,
      updateEmployeeDto,
    );

    return {
      message: 'Employee updated successfully',
      status: HttpStatus.OK,
      data: updatedEmployee.id,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
