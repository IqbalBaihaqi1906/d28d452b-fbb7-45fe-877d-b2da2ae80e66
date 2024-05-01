import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';
import { Type } from 'class-transformer';

export class CreateManyEmployeeDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeDto)
  employees: CreateEmployeeDto[];
}
