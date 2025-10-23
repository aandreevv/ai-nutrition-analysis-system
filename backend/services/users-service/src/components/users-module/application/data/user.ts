export class User {
  id: string;
  email: string;
  password: string;

  public static build(data: Partial<User>): User {
    const user = new User();
    Object.assign(user, data);
    return user;
  }
}
