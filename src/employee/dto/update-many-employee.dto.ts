import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEmployeeDto } from './update-employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDtoWithId extends UpdateEmployeeDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateManyEmployeeDto {
  @ApiProperty({
    type: [UpdateEmployeeDtoWithId],
    description: 'Array of employee data with id',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateEmployeeDtoWithId)
  employees: UpdateEmployeeDtoWithId[];
}
