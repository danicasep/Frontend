import React from 'react';
import {
  Box,
  CircularProgress,
  Skeleton,
  Typography,
  Fade,
  useTheme
} from '@mui/material';
import { keyframes } from '@mui/system';

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface LoadingProps {
  variant?: 'circular' | 'skeleton' | 'custom' | 'dots' | 'pulse';
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
  isLoading?: boolean;
}

const CustomLoading: React.FC<LoadingProps> = ({
  variant = 'circular',
  size = 'medium',
  message = 'Loading...',
  fullScreen = true,
  isLoading = false
}) => {
  const theme = useTheme();

  const getSizeValue = () => {
    switch (size) {
      case 'small': return 30;
      case 'large': return 60;
      default: return 40;
    }
  };

  const CircularLoader = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <CircularProgress
        size={getSizeValue()}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
          animation: `${spin} 1s linear infinite`
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  const SkeletonLoader = () => (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" width="100%" height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );

  const CustomLoader = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Box
        sx={{
          width: getSizeValue(),
          height: getSizeValue(),
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          animation: `${pulse} 2s infinite`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '60%',
            height: '60%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '50%'
          }}
        />
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  const DotsLoader = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              animation: `${pulse} 1.4s ease-in-out ${index * 0.16}s infinite both`
            }}
          />
        ))}
      </Box>
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  const PulseLoader = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Box
        sx={{
          width: getSizeValue(),
          height: getSizeValue(),
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          animation: `${pulse} 1.5s ease-in-out infinite`
        }}
      />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'skeleton': return <SkeletonLoader />;
      case 'custom': return <CustomLoader />;
      case 'dots': return <DotsLoader />;
      case 'pulse': return <PulseLoader />;
      default: return <CircularLoader />;
    }
  };

  const containerStyles = fullScreen ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  };

  return isLoading ? (
    <Fade in timeout={300}>
      <Box sx={containerStyles}>
        {renderLoader()}
      </Box>
    </Fade>
  ) : null;
};

export default CustomLoading;