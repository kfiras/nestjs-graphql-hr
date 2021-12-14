import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MONGO_DB_URL } from './app.properties';
import { EmployeeModule } from '../employee/employee.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    DepartmentModule,
    EmployeeModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/auto-generated-schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot(MONGO_DB_URL, {dbName: 'employees'}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
