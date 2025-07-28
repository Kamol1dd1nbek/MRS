import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsInt()
  visit_id: number;

  @IsString()
  @MaxLength(5000)
  text: string;
}
