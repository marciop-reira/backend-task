import { ObjectId } from 'bson';
import { Replace } from 'src/helpers/Replace';

export interface AvatarProps {
  userId: string;
  hash: string;
  fileName: string;
  createdAt: Date;
}

export class Avatar {
  private _id: string;
  private props: AvatarProps;

  constructor(props: Replace<AvatarProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? new ObjectId().toString();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get hash(): string {
    return this.props.hash;
  }

  public get fileName(): string {
    return this.props.fileName;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
