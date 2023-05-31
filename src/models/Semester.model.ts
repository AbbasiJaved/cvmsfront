import {
  Table,
  Column,
  Model,
  Comment,
  Unique,
  HasMany,
  DataType,
} from "sequelize-typescript";
import HolidayModel from "./Holiday.model";
import TimetableModel from "./Timetable.model";

@Table({
  tableName: "semesters",
  underscored: true,
  timestamps: true,
})
export default class SemesterModel extends Model<SemesterModel> {
  @Comment("The semester's name")
  @Column
  name!: string;

  @Comment("The semester's start date")
  @Column(DataType.DATEONLY)
  startDate!: Date;

  @Comment("The semester's end date")
  @Column(DataType.DATEONLY)
  endDate!: Date;

  @HasMany(() => HolidayModel, { onDelete: "CASCADE" })
  holidays!: HolidayModel[];

  @HasMany(() => TimetableModel, { onDelete: "CASCADE" })
  timetables!: TimetableModel[];
}
