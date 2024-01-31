import Box from '@mui/material/Box';
import { PageProps } from '@/types/page';
import withAuth from '@/components/HOCs/withAuthenticated';

export type BaseLayoutProps = PageProps;

const BaseLayout = ({ children }: React.PropsWithChildren<BaseLayoutProps>) => {
  return <Box>{children}</Box>;
};

export default withAuth(BaseLayout);
