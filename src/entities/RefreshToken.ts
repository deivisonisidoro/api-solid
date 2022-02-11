import { v4 as uuid } from "uuid";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken{
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public expires_in: number;
  @Column()
  public user_id: string;
  @ManyToOne(()=> User)
  @JoinColumn({name: "user_id"})
  public user: User;
  @CreateDateColumn()
  public created_at: Date;

  constructor(props: Omit<RefreshToken, 'id'>, id?: string){
    Object.assign(this, props);
    
    if(!id){
      this.id = uuid();
    }
  }
}