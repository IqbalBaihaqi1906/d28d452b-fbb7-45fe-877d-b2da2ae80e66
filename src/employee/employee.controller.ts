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

    return employees;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
