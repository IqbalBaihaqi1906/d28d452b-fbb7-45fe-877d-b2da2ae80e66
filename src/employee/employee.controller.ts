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
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  createEmployeeRequestBody,
  createManyApiBody,
  updateEmployeeRequestBody,
  updateManyEmployeeRequestBody,
} from './api-doc/api-request';
import {
  badRequestResponse,
  createEmployeeOkResponse,
  createManyEmployeeOkResponse,
  deleteEmployeeOkResponse,
  employeeNotFoundResponse,
  getEmployeeOkResponse,
  internalServerError,
  updateEmployeeOkResponse,
  updateManyEmployeeOkResponse,
} from './api-doc/api.response';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiResponse(internalServerError)
  @ApiBody(createEmployeeRequestBody)
  @ApiResponse(createEmployeeOkResponse)
  @ApiResponse(badRequestResponse)
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

  @ApiBody(createManyApiBody)
  @ApiResponse(createManyEmployeeOkResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(internalServerError)
  @Post('many')
  @UsePipes(new ValidationPipe())
  async createMany(@Body() createManyEmployeesDto: CreateManyEmployeeDto) {
    const newEmployees = await this.employeeService.createMany(
      createManyEmployeesDto,
    );

    return {
      message: 'Employee created successfully',
      status: HttpStatus.CREATED,
      newEmployees: newEmployees.map((employee) => employee.id),
    };
  }

  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  @ApiResponse(getEmployeeOkResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(internalServerError)
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
      data: {
        employees: employees.data,
        total: employees.total,
        totalPages: employees.totalPages,
        perPage: employees.perPage,
      },
    };
  }

  @ApiBody(updateManyEmployeeRequestBody)
  @ApiOperation({
    description:
      'All the parameters except id are optional. You can update one or more fields of the employee',
  })
  @ApiResponse(badRequestResponse)
  @ApiResponse(internalServerError)
  @ApiResponse(updateManyEmployeeOkResponse)
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

  @ApiOperation({
    description:
      'All the parameters except id are optional. You can update one or more fields of the employee',
  })
  @ApiBody(updateEmployeeRequestBody)
  @ApiResponse(badRequestResponse)
  @ApiResponse(internalServerError)
  @ApiResponse(updateEmployeeOkResponse)
  @ApiResponse(employeeNotFoundResponse)
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

  @ApiResponse(badRequestResponse)
  @ApiResponse(internalServerError)
  @ApiResponse(deleteEmployeeOkResponse)
  @ApiResponse(employeeNotFoundResponse)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.employeeService.deleteById(id);

    return {
      message: 'Employee deleted successfully',
      status: HttpStatus.OK,
      deletedEmployeeId: id,
    };
  }
}
