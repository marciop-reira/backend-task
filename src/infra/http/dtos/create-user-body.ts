import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateUserBody {
  @ApiProperty({
    example: 'test@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty()
  @Length(3, 20)
  lastName: string;

  @ApiProperty({
    example: 'images.com/avatar.png',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  avatarUrl: string;
}
