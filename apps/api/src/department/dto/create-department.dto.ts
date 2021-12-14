import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

@InputType()
export class CreateDepartmentDto {
  @IsNotEmpty()
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => [String])
  employees?: Schema.Types.ObjectId[];
}
