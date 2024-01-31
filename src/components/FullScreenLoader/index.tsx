import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@/components/Typography';

interface FullScreenLoaderProps {
  title: string;
}

const FullScreenLoader = ({ title }: FullScreenLoaderProps) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
      <Typography size="base" sx={{ marginTop: '24px' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default FullScreenLoader;
