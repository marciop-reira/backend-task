import { readdir, promises } from 'fs';

function removeAllAvatarsFiles() {
  readdir(process.env.AVATARS_DIR, {}, (_, files) => {
    files.forEach(async (file) => {
      try {
        await promises.unlink(`${process.env.AVATARS_DIR}${file}`);
      } catch (error) {}
    });
  });
}

export { removeAllAvatarsFiles };
