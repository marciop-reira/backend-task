import { ObjectId } from 'bson';
import { Replace } from 'src/helpers/Replace';

export interface UserProps {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? new ObjectId().toString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get avatarUrl(): string {
    return this.props.avatarUrl;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
