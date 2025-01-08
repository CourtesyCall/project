import { Injectable } from '@nestjs/common';
import {Product} from "./product.model";
import {InjectModel} from "@nestjs/sequelize";


@Injectable()
export class AppService {

  constructor(
      @InjectModel(Product)
      private productModel: typeof Product,
  ) {}

  async findAll(page: number, pageSize: number, search: string, id: number): Promise<{ products: Product[], totalCount: number }> {
    console.log('findAll method called');

    const offset = (page - 1) * pageSize;

    console.log('Search query:', search);


    if (id) {
      const productById = await this.findOne(Number(id));
      if (productById) {
        return { products: [productById], totalCount: 1 };
      } else {
        return { products: [], totalCount: 0 };
      }
    }

    if (search) {
      const productByName = await this.findbyName(search);
      if (productByName) {
        return { products: [productByName], totalCount: 1 };
      } else {
        return { products: [], totalCount: 0 };
      }
    }


    const products = await this.productModel.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalCount = await this.productModel.count({
    });

    return { products, totalCount };
  }


  findOne(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  findbyName(name: string) : Promise<Product>{
    return this.productModel.findOne({where: {name}})
  }

  async create(product: Partial<Product>): Promise<Product> {
    try {
      console.log(product);
      return await this.productModel.create(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product' + error + 'product - ' + product);
    }
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const existingProduct = await this.findOne(id);
    if (existingProduct) {
      return existingProduct.update(product);
    }
    return null;
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const product = await this.findOne(id);
    if (product) {
      await product.destroy();
      return { success: true, message: 'Product deleted successfully' };
    } else {
      return { success: false, message: 'Product not found' };
    }
  }



}
