import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyEmployeeDto {
  @ApiProperty({
    type: [CreateEmployeeDto],
    description: 'Array of employee data',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeDto)
  employees: CreateEmployeeDto[];
}
