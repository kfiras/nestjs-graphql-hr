import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type EmployeeDocument = Employee & Document;

@ObjectType()
@Schema()
export class Employee {
    @Field()
    @Prop()
    id: string
    @Field()
    @Prop()
    firstName: string
    @Field()
    @Prop()
    lastName: string
    @Field()
    @Prop()
    title: string
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export const schemas = [
    { name: 'Employee', schema: EmployeeSchema },
  ];
