import ImageModel from '@server/models/image.model';
import { Types } from 'mongoose';

export default class ImageService {
  static async create(_file: Express.Multer.File, accountId: Types.ObjectId) {
    const { filename, mimetype, size, originalname } = _file;
    const newImage = await ImageModel.create({
      name: originalname,
      mimeType: mimetype,
      size,
      url: '/uploads/' + filename,
      accountId,
    });
    return newImage;
  }
}
