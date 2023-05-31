import {
  Table,
  Column,
  Model,
  Unique,
  Comment,
  BelongsTo,
  ForeignKey,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import MeetingModel from "./Meeting.model";
import ProgramModel from "./Program.model";
import UserModel from "./User.model";
import VenueModel from "./Venue.model";

@Table({
  tableName: "courses",
  underscored: true,
  timestamps: true,
})
export default class CourseModel extends Model<CourseModel> {
  @Comment("The course's name")
  @Column(DataType.STRING)
  name!: string;

  @Comment("The course's unique code")
  @Unique
  @Column(DataType.STRING)
  code!: string;

  @Comment("The course's lecturer")
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  lecturerId?: number;

  @BelongsTo(() => UserModel, "lecturerId")
  lecturer?: UserModel;

  @Comment(
    "The course's pending lecturer (the lecturer who want to teach the course)"
  )
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  pendingLecturerId?: number;

  @BelongsTo(() => UserModel, "pendingLecturerId")
  pendingLecturer?: UserModel;

  @Comment("The course's program ID")
  @ForeignKey(() => ProgramModel)
  @Column(DataType.INTEGER)
  programId?: number;

  @BelongsTo(() => ProgramModel, "programId")
  program?: ProgramModel;

  @Comment("The course's preferred venue ID")
  @ForeignKey(() => VenueModel)
  @Column(DataType.INTEGER)
  preferredVenueId?: number;

  @BelongsTo(() => VenueModel, "preferredVenueId")
  preferredVenue?: VenueModel;

  @HasMany(() => MeetingModel, { onDelete: "CASCADE" })
  meetings?: MeetingModel[];
}
