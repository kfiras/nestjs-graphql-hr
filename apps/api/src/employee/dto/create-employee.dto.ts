import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateEmployeeDto {
    @IsNotEmpty()
    @Field()
    id: string
    @IsNotEmpty()
    @Field()
    firstName: string
    @IsNotEmpty()
    @Field()
    lastName: string
    @IsNotEmpty()
    @Field()
    title: string
}
