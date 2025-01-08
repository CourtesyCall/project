import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {ProductsModule} from "./products.module";
import * as process from "process";

@Module({
  controllers: [],
  providers: [],
  imports:[
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: 'postgres',
        password: '1122',
        database: 'postgres-products',
        models: [Product],
        autoLoadModels: true
    }),
    ProductsModule
  ]
})
export class AppModule {}
