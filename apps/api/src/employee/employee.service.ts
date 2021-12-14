import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {

  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeModel.create(createEmployeeDto);
  }

  async findAll() {
    return this.employeeModel.find().lean();
  }

  async getById(_id: Schema.Types.ObjectId) {
    return this.employeeModel.findById(_id).exec();
  }

  async findOne(id: string) {
    return this.employeeModel.findOne({"id": id});
  }

  async update(payload: UpdateEmployeeDto) {
    const updateObject = Object.assign({},
      payload.firstName && {firstName: payload.firstName},
      payload.lastName && {lastName: payload.lastName},
      payload.title && {title: payload.title},
    );
    return this.employeeModel
      .findOneAndUpdate({id: payload.id}, updateObject)
      .exec();
  }

  async delete(id: string) {
    return this.employeeModel.findOneAndDelete({id: id}).exec();
  }
}
