import { TErrorResponse } from '@server/schema/response.schema';
import { toast } from 'react-hot-toast';

export const toastResponse = async (promises: Promise<string>) => {
  try {
    const message = await promises;
    toast.success(message!, {
      position: 'bottom-center',
    });
  } catch (error) {
    console.log(error);
    toast.error((error as TErrorResponse).message!, {
      position: 'bottom-center',
    });
  }
};
