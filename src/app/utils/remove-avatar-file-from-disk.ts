import { promises } from 'fs';

async function removeAvatarFileFromDisk(path: string): Promise<void> {
  try {
    await promises.unlink(path);
  } catch (error) {}
}

export { removeAvatarFileFromDisk };
