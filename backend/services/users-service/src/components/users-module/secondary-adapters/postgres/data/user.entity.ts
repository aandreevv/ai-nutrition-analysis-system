import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @Column({ type: 'uuid' })
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  public static fromObject(_data: UserEntity) {
    const user = new UserEntity();
    Object.assign(user, _data);
    return user;
  }
}
