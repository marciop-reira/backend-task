import { existsSync } from 'fs';

function avatarFileExists(fileName: string): boolean {
  return existsSync(`${process.env.AVATARS_DIR}${fileName}`);
}

export { avatarFileExists };
