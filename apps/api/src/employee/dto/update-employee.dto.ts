import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateEmployeeDto {
    @IsNotEmpty()
    @Field()
    id: string
    @Field({nullable: true})
    firstName: string
    @Field({nullable: true})
    lastName: string
    @Field({nullable: true})
    title: string
}
