import { uuid } from "uuidv4";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("categories")
export class Category{
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @CreateDateColumn()
  public created_at: Date;

  constructor(props: Omit<Category, 'id'>, id?: string){
    Object.assign(this, props);
    
    if(!id){
      this.id = uuid();
    }
  }
}