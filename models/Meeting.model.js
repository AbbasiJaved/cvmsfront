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
const Timetable_model_1 = __importDefault(require("./Timetable.model"));
const Venue_model_1 = __importDefault(require("./Venue.model"));
let MeetingModel = class MeetingModel extends sequelize_typescript_1.Model {
    date;
    online;
    courseId;
    course;
    venueId;
    venue;
    timetableId;
    timetable;
};
__decorate([
    (0, sequelize_typescript_1.Comment)("The meeting's date"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATEONLY),
    __metadata("design:type", String)
], MeetingModel.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The meeting's online remark"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], MeetingModel.prototype, "online", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The meeting's course id"),
    (0, sequelize_typescript_1.ForeignKey)(() => Course_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MeetingModel.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Course_model_1.default, "courseId"),
    __metadata("design:type", Course_model_1.default)
], MeetingModel.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The meeting's venue id"),
    (0, sequelize_typescript_1.ForeignKey)(() => Venue_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MeetingModel.prototype, "venueId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Venue_model_1.default, "venueId"),
    __metadata("design:type", Venue_model_1.default)
], MeetingModel.prototype, "venue", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)("The meeting's timetable id"),
    (0, sequelize_typescript_1.ForeignKey)(() => Timetable_model_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MeetingModel.prototype, "timetableId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Timetable_model_1.default, "timetableId"),
    __metadata("design:type", Timetable_model_1.default)
], MeetingModel.prototype, "timetable", void 0);
MeetingModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "meetings",
        underscored: true,
        timestamps: true,
    })
], MeetingModel);
exports.default = MeetingModel;
