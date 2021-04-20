import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import { v4 as uuid } from "uuid"

import { User } from "./Users";

@Entity("connections")
class Connection {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection };
