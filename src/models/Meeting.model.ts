import {
  Table,
  Column,
  Model,
  DataType,
  Comment,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import CourseModel from "./Course.model";
import TimetableModel from "./Timetable.model";
import VenueModel from "./Venue.model";

@Table({
  tableName: "meetings",
  underscored: true,
  timestamps: true,
})
export default class MeetingModel extends Model {
  @Comment("The meeting's date")
  @Column(DataType.DATEONLY)
  date!: string;

  @Comment("The meeting's online remark")
  @Column(DataType.BOOLEAN)
  online!: boolean;

  @Comment("The meeting's course id")
  @ForeignKey(() => CourseModel)
  @Column(DataType.INTEGER)
  courseId!: number;

  @BelongsTo(() => CourseModel, "courseId")
  course?: CourseModel;

  @Comment("The meeting's venue id")
  @ForeignKey(() => VenueModel)
  @Column(DataType.INTEGER)
  venueId!: number;

  @BelongsTo(() => VenueModel, "venueId")
  venue?: VenueModel;

  @Comment("The meeting's timetable id")
  @ForeignKey(() => TimetableModel)
  @Column(DataType.INTEGER)
  timetableId!: number;

  @BelongsTo(() => TimetableModel, "timetableId")
  timetable?: TimetableModel;
}
