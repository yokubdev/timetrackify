import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

export interface TimeInterval {
  start: Date | string;
  end: Date | string | null;
  duration: number | null;
}

interface TrackCreationAttrs {
  userId: string;
  projectId: string;
  description: string;
  billable: boolean;
  state: string;
  type: string;
  taskId: string;
  tagIds: string[];
  customFields: [];
}

@Table({ tableName: 'tracks' })
export class Track extends Model<Track, TrackCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.STRING })
  projectId: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.BOOLEAN })
  billable: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  state: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  taskId: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tagIds: string[];

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  customFields: [];

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  timeInterval: TimeInterval;

  @BelongsTo(() => User)
  user: User;
}
