import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Schema } from 'mongoose';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(@InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>, private employeeService: EmployeeService) {

  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  async findAll() {
    return this.departmentModel.find().lean();
  }

  getById(_id: Schema.Types.ObjectId) {
    return this.departmentModel.findById(_id).exec();
  }

  async findOne(id: string) {
    return this.departmentModel.findOne({"id": id});
  }

  async update(payload: UpdateDepartmentDto) {
    const updateObject = Object.assign({},
      payload.name && {name: payload.name},
    );
    return this.departmentModel
      .findOneAndUpdate({id: payload.id}, updateObject)
      .exec();
  }

  async delete(id: string) {
    return this.departmentModel.findOneAndDelete({id: id}).exec();
  }
  async findEmployeesByDepartmentId(id: string) {
    const employees: Employee[] = [];
    const employeeIds: Schema.Types.ObjectId[] = (await this.departmentModel.findOne({id: id})).employees;
    for(const employeeId of employeeIds) {
      const employee = await this.employeeService.getById(employeeId);
      employees.push(employee); 
    }
    return employees;
  }
}
