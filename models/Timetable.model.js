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
const Meeting_model_1 = __importDefault(require("./Meeting.model"));
const Program_model_1 = __importDefault(require("./Program.model"));
const Semester_model_1 = __importDefault(require("./Semester.model"));
let TimetableModel = class TimetableModel extends sequelize_typescript_1.Model {
    name;
    viewable;
    programId;
    program;
    semesterId;
    semester;
    meetings;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The timetable's name"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], TimetableModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The timetable's viewable state"),
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], TimetableModel.prototype, "viewable", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The timetable's program id"),
    (0, sequelize_typescript_1.ForeignKey)(() => Program_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], TimetableModel.prototype, "programId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Program_model_1.default),
    __metadata("design:type", Program_model_1.default)
], TimetableModel.prototype, "program", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The timetable's semester id"),
    (0, sequelize_typescript_1.ForeignKey)(() => Semester_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], TimetableModel.prototype, "semesterId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Semester_model_1.default),
    __metadata("design:type", Semester_model_1.default)
], TimetableModel.prototype, "semester", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Meeting_model_1.default, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], TimetableModel.prototype, "meetings", void 0);
TimetableModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "timetables",
        underscored: true,
        timestamps: true,
    })
], TimetableModel);
exports.default = TimetableModel;
