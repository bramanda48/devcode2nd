import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "todo"})
export class Todo {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'integer'
    })
    activity_group_id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        type: 'bool',
        default: true
    })
    is_active: boolean;

    @Column({
        type: 'varchar',
        length: 50,
        default: "very-high"
    })    
    priority: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}
