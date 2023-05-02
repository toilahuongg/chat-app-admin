import { TErrorResponse } from '@server/schema/response.schema';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export const toastResponse = async (promises: Promise<string | undefined>) => {
  try {
    const message = await promises;
    toast.success(message || 'Success!', {
      position: 'bottom-center',
    });
  } catch (error) {
    let message: string | undefined = '';
    if ((error as AxiosError<TErrorResponse>)?.response)
      message = (error as AxiosError<TErrorResponse>)?.response?.data?.message;
    else if ((error as Error).message) message = (error as Error).message;
    toast.error(message || 'Something went wrong!', {
      position: 'bottom-center',
    });
  }
};
