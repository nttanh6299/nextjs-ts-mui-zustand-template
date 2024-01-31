import { useState } from 'react';
import FullScreenLoader from '@/components/FullScreenLoader';

type StatusType = 'loading' | 'authenticated';

function withAuth<T extends object>(Component: React.ComponentType<T>) {
  const WithAuthComponent = (props: T) => {
    const [status] = useState<StatusType>('authenticated');

    if (status === 'loading') {
      return <FullScreenLoader title="Authorizing..." />;
    }

    return <Component {...props} />;
  };
  return WithAuthComponent;
}

export default withAuth;
