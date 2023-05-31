import {
  Table,
  Column,
  Model,
  Comment,
  Unique,
  BelongsTo,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import SemesterModel from "./Semester.model";

@Table({
  tableName: "holidays",
  underscored: true,
  timestamps: true,
})
export default class HolidayModel extends Model<HolidayModel> {
  @Comment("The holiday's name")
  @Column
  name!: string;

  @Comment("The holiday's start date")
  @Unique
  @Column(DataType.DATEONLY)
  startDate!: Date;

  @Comment("The holiday's end date")
  @Unique
  @Column(DataType.DATEONLY)
  endDate!: Date;

  @Comment("The holiday's type")
  @Column
  type!: string;

  @Comment("The semester_id of the semester this holiday belongs to")
  @ForeignKey(() => SemesterModel)
  @Column
  semesterId!: number;

  @BelongsTo(() => SemesterModel, "semesterId")
  semester!: SemesterModel;
}
