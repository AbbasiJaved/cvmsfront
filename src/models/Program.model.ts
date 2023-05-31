import {
  Table,
  Model,
  Column,
  Comment,
  Unique,
  HasMany,
  DataType,
} from "sequelize-typescript";
import CourseModel from "./Course.model";
import TimetableModel from "./Timetable.model";

@Table({
  tableName: "programs",
  underscored: true,
  timestamps: true,
})
export default class ProgramModel extends Model<ProgramModel> {
  @Comment("The program's name")
  @Column(DataType.STRING)
  name!: string;

  @Comment("The program's code")
  @Unique
  @Column(DataType.STRING)
  code!: string;

  @HasMany(() => CourseModel)
  courses?: CourseModel[];

  @HasMany(() => TimetableModel, { onDelete: "CASCADE" })
  timetables?: TimetableModel[];
}
