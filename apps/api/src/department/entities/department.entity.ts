import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Employee } from '../../employee/entities/employee.entity';

export type DepartmentDocument = Department & Document;

@ObjectType()
@Schema()
export class Department {
  @Field()
  @Prop()
  id: string;
  @Field()
  @Prop()
  name: string;

  @Field(() => [Employee], {nullable: true})
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Employee' })
  employees: MongooseSchema.Types.ObjectId[];// | Employee[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
