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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Course_model_1 = __importDefault(require("./Course.model"));
let User = class User extends sequelize_typescript_1.Model {
    firstName;
    lastName;
    staffId;
    email;
    password;
    emailVerified;
    verifyEmailToken;
    resetPasswordToken;
    role;
    status;
    loginAt;
    sessionTime;
    courses;
    pendingCourses;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's first name"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's last name"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's staff ID"),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "staffId", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's email address"),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's password"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's email address has been verified"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's email address verification token"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "verifyEmailToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's password reset token"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's role ('user' or 'admin')"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's account status ('approved' or 'pending' or 'rejected')"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's login date"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "loginAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The user's activity time"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "sessionTime", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Course_model_1.default, "lecturerId"),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Course_model_1.default, "pendingLecturerId"),
    __metadata("design:type", Array)
], User.prototype, "pendingCourses", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        underscored: true,
        timestamps: true,
    })
], User);
exports.default = User;
