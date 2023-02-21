import {unlink} from 'fs/promises';
import {extname} from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = Array(20)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

export const deleteFileName = async (file) => {
  await (async () => {
    try {
      await unlink('./public/avatars/' + file);
    } catch (e) {
      console.log('error', e);
    }
  })();
};
