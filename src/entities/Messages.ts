import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import { v4 as uuid } from "uuid"

import { User } from "./Users";

@Entity("messages")
class Message {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  text: string;

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

export { Message };
