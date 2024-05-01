import { HttpStatus } from '@nestjs/common';

export const getEmployeeOkResponse = {
  status: HttpStatus.OK,
  description: 'Returns a list of employees',
};

export const createEmployeeOkResponse = {
  status: HttpStatus.CREATED,
  description: 'Employee created successfully',
};

export const createManyEmployeeOkResponse = {
  status: HttpStatus.CREATED,
  description: 'Employees created successfully',
};

export const updateManyEmployeeOkResponse = {
  status: HttpStatus.OK,
  description: 'Employees updated successfully',
};

export const updateEmployeeOkResponse = {
  status: HttpStatus.OK,
  description: 'Employee updated successfully',
};

export const deleteEmployeeOkResponse = {
  status: HttpStatus.OK,
  description: 'Employee deleted successfully',
};

export const employeeNotFoundResponse = {
  status: HttpStatus.NOT_FOUND,
  description: 'Employee not found',
};

export const badRequestResponse = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Bad request, Please check error the message and try again',
};

export const internalServerError = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Unhandled Error, Please check the error message and try again',
};
