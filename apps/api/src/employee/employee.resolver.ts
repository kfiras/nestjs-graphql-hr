import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Resolver(() => Employee)
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) { }

    @Query(() => [Employee], { name: "getAllEmployees" })
    async findAll() {
        return this.employeeService.findAll();
    }

    @Mutation(() => Employee, { name: "createEmployee" })
    async create(@Args('employeeInput') employee: CreateEmployeeDto) {
        return this.employeeService.create(employee)
    }
    @Mutation(() => Employee, { name: "deleteEmployee" })
    async delete(@Args('id') id: string) {
        return this.employeeService.delete(id);
    }
    @Mutation(() => Employee, { name: "updateEmployee" })
    async update(@Args('employeeInput') employeeInput: UpdateEmployeeDto) {
        return this.employeeService.update(employeeInput);
    }
    @Query(() => Employee, {name: "getEmployee", nullable: true})
    async findOne(@Args('id', { type: () => String }) id: string) {
        return this.employeeService.findOne(id);
    }
}