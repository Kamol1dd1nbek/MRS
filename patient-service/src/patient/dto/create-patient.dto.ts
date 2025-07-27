import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, MaxDate } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  dob: Date;

  @IsNumber()
  doctor_id: number;
}
