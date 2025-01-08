"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const product_model_1 = require("./product.model");
const sequelize_1 = require("@nestjs/sequelize");
let AppService = class AppService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(page, pageSize, search, id) {
        console.log('findAll method called');
        const offset = (page - 1) * pageSize;
        console.log('Search query:', search);
        if (id) {
            const productById = await this.findOne(Number(id));
            if (productById) {
                return { products: [productById], totalCount: 1 };
            }
            else {
                return { products: [], totalCount: 0 };
            }
        }
        if (search) {
            const productByName = await this.findbyName(search);
            if (productByName) {
                return { products: [productByName], totalCount: 1 };
            }
            else {
                return { products: [], totalCount: 0 };
            }
        }
        const products = await this.productModel.findAll({
            limit: pageSize,
            offset: offset,
        });
        const totalCount = await this.productModel.count({});
        return { products, totalCount };
    }
    findOne(id) {
        return this.productModel.findByPk(id);
    }
    findbyName(name) {
        return this.productModel.findOne({ where: { name } });
    }
    async create(product) {
        try {
            console.log(product);
            return await this.productModel.create(product);
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Failed to create product' + error + 'product - ' + product);
        }
    }
    async update(id, product) {
        const existingProduct = await this.findOne(id);
        if (existingProduct) {
            return existingProduct.update(product);
        }
        return null;
    }
    async delete(id) {
        const product = await this.findOne(id);
        if (product) {
            await product.destroy();
            return { success: true, message: 'Product deleted successfully' };
        }
        else {
            return { success: false, message: 'Product not found' };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object])
], AppService);
//# sourceMappingURL=app.service.js.map