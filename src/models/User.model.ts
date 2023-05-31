import {
  Table,
  Model,
  Column,
  DataType,
  Comment,
  Unique,
  HasMany,
  Default,
} from "sequelize-typescript";
import CourseModel from "./Course.model";

@Table({
  tableName: "users",
  underscored: true,
  timestamps: true,
})
export default class User extends Model {
  @Comment("The user's first name")
  @Column(DataType.STRING)
  firstName!: string;

  @Comment("The user's last name")
  @Column(DataType.STRING)
  lastName!: string;

  @Comment("The user's staff ID")
  @Unique
  @Column(DataType.STRING)
  staffId!: string;

  @Comment("The user's email address")
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Comment("The user's password")
  @Column(DataType.STRING)
  password!: string;

  @Comment("The user's email address has been verified")
  @Column(DataType.BOOLEAN)
  emailVerified!: boolean;

  @Comment("The user's email address verification token")
  @Column(DataType.STRING)
  verifyEmailToken?: string;

  @Comment("The user's password reset token")
  @Column(DataType.STRING)
  resetPasswordToken?: string;

  @Comment("The user's role ('user' or 'admin')")
  @Column(DataType.STRING)
  role!: "user" | "admin";

  @Comment("The user's account status ('approved' or 'pending' or 'rejected')")
  @Column(DataType.STRING)
  status?: "approved" | "pending" | "rejected";

  @Comment("The user's login date")
  @Column(DataType.DATE)
  loginAt?: Date;

  @Comment("The user's activity time")
  @Column(DataType.DATE)
  sessionTime?: Date;


  @HasMany(() => CourseModel, "lecturerId")
  courses?: CourseModel[];

  @HasMany(() => CourseModel, "pendingLecturerId")
  pendingCourses?: CourseModel[];
}
