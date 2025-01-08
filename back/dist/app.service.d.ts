import { Product } from "./product.model";
export declare class AppService {
    private productModel;
    constructor(productModel: typeof Product);
    findAll(page: number, pageSize: number, search: string, id: number): Promise<{
        products: Product[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<Product>;
    findbyName(name: string): Promise<Product>;
    create(product: Partial<Product>): Promise<Product>;
    update(id: number, product: Partial<Product>): Promise<Product>;
    delete(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
