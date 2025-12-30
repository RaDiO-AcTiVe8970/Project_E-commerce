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
exports.ShopsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shops_service_1 = require("./shops.service");
const create_shop_dto_1 = require("./dto/create-shop.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let ShopsController = class ShopsController {
    shopsService;
    constructor(shopsService) {
        this.shopsService = shopsService;
    }
    findAll() {
        return this.shopsService.findAll();
    }
    create(userId, createShopDto) {
        return this.shopsService.create(userId, createShopDto);
    }
    findOne(id) {
        return this.shopsService.findOne(id);
    }
    findByUserId(userId) {
        return this.shopsService.findByUserId(userId);
    }
    verify(id) {
        return this.shopsService.verify(id);
    }
};
exports.ShopsController = ShopsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shops (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shops retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a shop (become a seller)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Shop created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User already has a shop' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_shop_dto_1.CreateShopDto]),
    __metadata("design:returntype", void 0)
], ShopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shop by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shop found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shop by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shop found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopsController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a shop (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shop verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shop not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopsController.prototype, "verify", null);
exports.ShopsController = ShopsController = __decorate([
    (0, swagger_1.ApiTags)('Shops'),
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shops_service_1.ShopsService])
], ShopsController);
//# sourceMappingURL=shops.controller.js.map