import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { CreateManyEmployeeDto } from '../dto/create-many-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { UpdateManyEmployeeDto } from '../dto/update-many-employee.dto';

export const createEmployeeRequestBody = {
  type: CreateEmployeeDto,
  examples: {
    'example-response': {
      value: {
        firstName: 'Ita',
        lastName: 'Rosita',
        position: 'Engineer',
        phone: '+62145313513',
        email: 'ita@gmail.com',
      },
    },
  },
};

export const createManyApiBody = {
  type: CreateManyEmployeeDto,
  examples: {
    'example-response': {
      value: {
        employees: [
          {
            firstName: 'John',
            lastName: 'Doe',
            position: 'Manager',
            phone: '+123456789',
            email: 'john.doe@example.com',
          },
          {
            firstName: 'Alice',
            lastName: 'Smith',
            position: 'Developer',
            phone: '+987654321',
            email: 'alice.smith@example.com',
          },
        ],
      },
    },
  },
};

export const updateEmployeeRequestBody = {
  type: UpdateEmployeeDto,
  examples: {
    'example-response': {
      value: {
        firstName: 'Iqbal',
        lastName: 'Baihaqi',
        position: 'Lead Manager',
        phone: '08123913551',
        email: 'alice.smith@example.com',
      },
    },
  },
};

export const updateManyEmployeeRequestBody = {
  type: UpdateManyEmployeeDto,
  examples: {
    'example-response': {
      value: {
        employees: [
          {
            id: 1,
            firstName: 'Iqbal',
            lastName: 'Cinade',
          },
          {
            id: 5,
            position: 'Cheerleader',
            lastName: 'Puspita',
          },
          {
            id: 6,
            firstName: 'Alice',
            lastName: 'Borderland',
            position: 'Developer',
            phone: '+987654321',
            email: 'alice.smith@example.com',
          },
        ],
      },
    },
  },
};
