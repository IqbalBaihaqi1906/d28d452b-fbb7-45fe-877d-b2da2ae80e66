import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEmployeeDto } from './update-employee.dto';

export class UpdateEmployeeDtoWithId extends UpdateEmployeeDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateManyEmployeeDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateEmployeeDtoWithId)
  employees: UpdateEmployeeDtoWithId[];
}
