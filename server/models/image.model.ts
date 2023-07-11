import { TImage } from '@server/schema/image.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';

const DOCUMENT_NAME = 'Image';
const COLLECTION_NAME = 'Images';

const ImageSchema = new Schema<TImage>(
  {
    name: { type: String },
    mimeType: { type: String },
    size: { type: Number },
    url: { type: String },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: AccountModel.modelName,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const ImageModel = model<TImage>(DOCUMENT_NAME, ImageSchema);

export default ImageModel;
