import { useState } from 'react';
import Box from '@mui/material/Box';
import FullScreenLoader from '@/components/FullScreenLoader';

type StatusType = 'loading' | 'unauthenticated';

const UnauthenLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  const [status] = useState<StatusType>('unauthenticated');

  if (status === 'loading') {
    return <FullScreenLoader title="Authenticating..." />;
  }

  return <Box>{children}</Box>;
};

export default UnauthenLayout;
