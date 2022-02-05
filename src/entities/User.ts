import { uuid } from "uuidv4";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("users")
export class User{
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public name: string;
  @Column()
  public email: string;
  @Column()
  public password: string;
  @CreateDateColumn()
  public created_at: Date;

  constructor(props: Omit<User, 'id'>, id?: string){
    Object.assign(this, props);
    
    if(!id){
      this.id = uuid();
    }
  }
}