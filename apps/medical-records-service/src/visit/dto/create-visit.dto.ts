import { IsInt } from 'class-validator';

export class CreateVisitDto {
  @IsInt()
  patient_id: number;
}
