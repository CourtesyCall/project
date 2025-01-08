import {Module} from "@nestjs/common";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Product} from "./product.model";


@Module({
    providers: [AppService],
    controllers: [AppController],
    imports: [
        SequelizeModule.forFeature([Product]),
    ],
    exports: [SequelizeModule],
})

export class ProductsModule {}