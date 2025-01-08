import { Model } from 'sequelize-typescript';
export declare class Product extends Model<Product> {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    createdAt: Date;
    startedSale: Date;
}
