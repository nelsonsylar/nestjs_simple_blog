import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    default: false,
  })
  isDelete: boolean;

  @VersionColumn()
  version: number;

  @Column('text')
  nickname: string;

  @Column('text')
  mobile: string;

  // 加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;
}
