import {
  Resolver,
  Parent,
  Query,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentService } from './department.service';
import { Department, DepartmentDocument } from './entities/department.entity';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) {}

  @Query(() => [Department], { name: 'getAllDepartments' })
  async findAll() {
    return this.departmentService.findAll();
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  async create(@Args('departmentInput') department: CreateDepartmentDto) {
    return this.departmentService.create(department);
  }
  @Mutation(() => Department, { name: 'deleteDepartment' })
  async delete(@Args('id') id: string) {
    return this.departmentService.delete(id);
  }
  @Mutation(() => Department, { name: 'updateDepartment' })
  async update(@Args('departmentInput') departmentInput: UpdateDepartmentDto) {
    return this.departmentService.update(departmentInput);
  }
  @Query(() => Department, { name: 'getDepartment', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.departmentService.findOne(id);
  }
  /*
  @ResolveField()
  async employees(@Parent() department: DepartmentDocument) {
    await department.populate({ path: 'employees', model: Department.name });

    console.log(department.employees);
    return department.employees;
  }
  */
  
  @ResolveField()
  async employees(@Parent() parent: Department) {
    const employees = await this.departmentService.findEmployeesByDepartmentId(parent.id);
    return employees;
  }
}
