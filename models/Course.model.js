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
const User_model_1 = __importDefault(require("./User.model"));
const Venue_model_1 = __importDefault(require("./Venue.model"));
let CourseModel = class CourseModel extends sequelize_typescript_1.Model {
    name;
    code;
    lecturerId;
    lecturer;
    pendingLecturerId;
    pendingLecturer;
    programId;
    program;
    preferredVenueId;
    preferredVenue;
    meetings;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's name"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CourseModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's unique code"),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CourseModel.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's lecturer"),
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CourseModel.prototype, "lecturerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default, "lecturerId"),
    __metadata("design:type", User_model_1.default)
], CourseModel.prototype, "lecturer", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's pending lecturer (the lecturer who want to teach the course)"),
    (0, sequelize_typescript_1.ForeignKey)(() => User_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CourseModel.prototype, "pendingLecturerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_model_1.default, "pendingLecturerId"),
    __metadata("design:type", User_model_1.default)
], CourseModel.prototype, "pendingLecturer", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's program ID"),
    (0, sequelize_typescript_1.ForeignKey)(() => Program_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CourseModel.prototype, "programId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Program_model_1.default, "programId"),
    __metadata("design:type", Program_model_1.default)
], CourseModel.prototype, "program", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The course's preferred venue ID"),
    (0, sequelize_typescript_1.ForeignKey)(() => Venue_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CourseModel.prototype, "preferredVenueId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Venue_model_1.default, "preferredVenueId"),
    __metadata("design:type", Venue_model_1.default)
], CourseModel.prototype, "preferredVenue", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Meeting_model_1.default, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], CourseModel.prototype, "meetings", void 0);
CourseModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "courses",
        underscored: true,
        timestamps: true,
    })
], CourseModel);
exports.default = CourseModel;
