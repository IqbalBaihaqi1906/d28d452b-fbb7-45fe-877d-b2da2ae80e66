import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
