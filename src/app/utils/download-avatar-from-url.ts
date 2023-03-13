import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { createWriteStream, writeFileSync } from 'fs';

interface DownloadedAvatar {
  hash: string;
  fileName: string;
}

async function downloadAvatarFromUrl(
  avatarUrl: string,
): Promise<DownloadedAvatar> {
  const fileName = randomBytes(48).toString('base64url');
  const filePath = `${process.env.AVATARS_DIR}${fileName}`;

  try {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });

    if (String(response.headers['content-type']).indexOf('image/') === -1) {
      throw new BadRequestException('Invalid avatar url');
    }

    const buffer = Buffer.from(response.data, 'base64');
    const stream = createWriteStream(filePath);

    writeFileSync(stream.path, buffer);

    stream.on('finish', () => {
      stream.close();
    });

    return {
      hash: buffer.toString('base64'),
      fileName,
    };
  } catch (error) {
    throw new BadRequestException('Invalid avatar url');
  }
}

export { downloadAvatarFromUrl };
