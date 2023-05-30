/* eslint-disable @next/next/no-img-element */
import Card from '@src/components/Card';
import Dropzone from '@src/components/Dropzone';
import { useProductStore } from '../../store';
import { XMarkIcon } from '@heroicons/react/24/solid';

const ProductMedia = () => {
  const { product, addImageToMedia, removeImageFromMedia } = useProductStore((state) => state);
  const { media } = product;
  return (
    <Card>
      <Card.Section title="Media">
        <Dropzone onUpload={addImageToMedia} />
        {media.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-4">
              {media.map((image, idx) => (
                <div key={idx} className="group relative bg-gray-100 aspect-square rounded-md overflow-hidden">
                  <img src={image} className="aspect-square object-contain" alt="" />
                  <button
                    onClick={() => removeImageFromMedia(idx)}
                    className="absolute opacity-0 transition-all right-2 top-2 cursor-pointer group-hover:opacity-100"
                  >
                    <XMarkIcon width="24" height="24" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card.Section>
    </Card>
  );
};

export default ProductMedia;
