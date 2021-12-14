import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';
import { DepartmentResolver } from './department.resolver';
import { EmployeeService } from '../employee/employee.service';
import { Employee, EmployeeSchema } from '../employee/entities/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentResolver, EmployeeService],
})
export class DepartmentModule {}
