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
const Semester_model_1 = __importDefault(require("./Semester.model"));
let HolidayModel = class HolidayModel extends sequelize_typescript_1.Model {
    name;
    startDate;
    endDate;
    type;
    semesterId;
    semester;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The holiday's name"),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HolidayModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The holiday's start date"),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], HolidayModel.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The holiday's end date"),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], HolidayModel.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The holiday's type"),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HolidayModel.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The semester_id of the semester this holiday belongs to"),
    (0, sequelize_typescript_1.ForeignKey)(() => Semester_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], HolidayModel.prototype, "semesterId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Semester_model_1.default, "semesterId"),
    __metadata("design:type", Semester_model_1.default)
], HolidayModel.prototype, "semester", void 0);
HolidayModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "holidays",
        underscored: true,
        timestamps: true,
    })
], HolidayModel);
exports.default = HolidayModel;
