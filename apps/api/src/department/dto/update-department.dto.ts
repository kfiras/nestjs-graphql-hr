import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateDepartmentDto {
    @IsNotEmpty()
    @Field()
    id: string
    @Field({nullable: true})
    name: string
}
