import {
  Table,
  Column,
  Model,
  Comment,
  DataType,
  HasMany,
} from "sequelize-typescript";
import MeetingModel from "./Meeting.model";

@Table({
  tableName: "venues",
  underscored: true,
  timestamps: true,
})

export default class VenueModel extends Model<VenueModel> {
  @Comment("The venue's name")
  @Column(DataType.STRING)
  name!: string;

  @Comment("The venue's location")
  @Column(DataType.STRING)
  location!: string;

  @Comment("The venue's capacity")
  @Column(DataType.INTEGER)
  capacity!: number;

  @HasMany(() => MeetingModel)
  meetings?: MeetingModel[];
}
