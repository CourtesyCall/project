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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async findAll(page = 1, pageSize = 10, search = '', id = null) {
        const pageNumber = parseInt(String(page), 10);
        const pageSizeNumber = parseInt(String(pageSize), 10);
        console.log(pageNumber);
        console.log(pageSizeNumber);
        if (isNaN(pageNumber) || pageNumber <= 0) {
            return this.appService.findAll(1, pageSizeNumber, search, id);
        }
        if (isNaN(pageSizeNumber) || pageSizeNumber <= 0) {
            return this.appService.findAll(pageNumber, 10, search, id);
        }
        return this.appService.findAll(pageNumber, pageSizeNumber, search, id);
    }
    findOne(id) {
        return this.appService.findOne(id);
    }
    create(product) {
        return this.appService.create(product);
    }
    update(id, product) {
        return this.appService.update(id, product);
    }
    delete(id) {
        return this.appService.delete(id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delete", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map