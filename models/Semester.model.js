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
const Holiday_model_1 = __importDefault(require("./Holiday.model"));
const Timetable_model_1 = __importDefault(require("./Timetable.model"));
let SemesterModel = class SemesterModel extends sequelize_typescript_1.Model {
    name;
    startDate;
    endDate;
    holidays;
    timetables;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The semester's name"),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SemesterModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The semester's start date"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], SemesterModel.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The semester's end date"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", Date)
], SemesterModel.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Holiday_model_1.default, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], SemesterModel.prototype, "holidays", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Timetable_model_1.default, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], SemesterModel.prototype, "timetables", void 0);
SemesterModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "semesters",
        underscored: true,
        timestamps: true,
    })
], SemesterModel);
exports.default = SemesterModel;
