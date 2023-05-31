import {
  Table,
  Column,
  Model,
  Comment,
  DataType,
  ForeignKey,
  Default,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import MeetingModel from "./Meeting.model";
import ProgramModel from "./Program.model";
import SemesterModel from "./Semester.model";

@Table({
  tableName: "timetables",
  underscored: true,
  timestamps: true,
})
export default class TimetableModel extends Model<TimetableModel> {
  
  @Comment("The timetable's name")
  @Column(DataType.STRING)
  name!: string;

  @Comment("The timetable's viewable state")
  @Default(false)
  @Column(DataType.BOOLEAN)
  viewable!: boolean;

  @Comment("The timetable's program id")
  @ForeignKey(() => ProgramModel)
  @Column(DataType.INTEGER)
  programId!: number;

  @BelongsTo(() => ProgramModel)
  program?: ProgramModel;

  @Comment("The timetable's semester id")
  @ForeignKey(() => SemesterModel)
  @Column(DataType.INTEGER)
  semesterId!: number;

  @BelongsTo(() => SemesterModel)
  semester?: SemesterModel;

  @HasMany(() => MeetingModel, { onDelete: "CASCADE" })
  meetings?: MeetingModel[];
}
