import { ResponseType } from '@/utils/http-client';

const useErrorHandler = () => {
  const hasError = <T>(response?: ResponseType<T>) => {
    console.log(response);
    return false;
  };

  const handleCatchError = (err: unknown) => {
    if (typeof err === 'object' && err !== null && 'data' in err) {
      console.log();
    } else if (err instanceof Error) {
      console.log(err.message);
    }
    console.log('Error data:', err);
  };

  return {
    hasError,
    handleCatchError,
  };
};

export default useErrorHandler;
