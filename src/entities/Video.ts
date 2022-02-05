import { uuid } from "uuidv4";
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";

@Entity("videos")
export class Video{
  @PrimaryColumn()
  public readonly id: string;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @Column()
  public category_id: string;
  @Column()
  public duration: number;
  @ManyToOne(()=> Category)
  @JoinColumn({name: "category_id"})
  public category: Category;
  @CreateDateColumn()
  public created_at: Date;

  constructor(props: Omit<Video, 'id'>, id?: string){
    Object.assign(this, props);
    
    if(!id){
      this.id = uuid();
    }
  }
}