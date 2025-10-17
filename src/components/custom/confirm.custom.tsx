import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
  alpha,
  Slide,
  Zoom,
  Fade
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Help as QuestionIcon
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ZoomTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'delete' | 'warning' | 'info' | 'success' | 'question';
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  transition?: 'slide' | 'zoom' | 'fade';
}

const CustomConfirm: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'question',
  loading = false,
  maxWidth = 'sm',
  transition = 'zoom'
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getVariantConfig = () => {
    switch (variant) {
      case 'delete':
        return {
          icon: <ErrorIcon sx={{ fontSize: 48 }} />,
          color: theme.palette.error.main,
          bgColor: alpha(theme.palette.error.main, 0.1),
          confirmButtonColor: 'error' as const,
          iconBg: alpha(theme.palette.error.main, 0.2)
        };
      case 'warning':
        return {
          icon: <WarningIcon sx={{ fontSize: 48 }} />,
          color: theme.palette.warning.main,
          bgColor: alpha(theme.palette.warning.main, 0.1),
          confirmButtonColor: 'warning' as const,
          iconBg: alpha(theme.palette.warning.main, 0.2)
        };
      case 'info':
        return {
          icon: <InfoIcon sx={{ fontSize: 48 }} />,
          color: theme.palette.info.main,
          bgColor: alpha(theme.palette.info.main, 0.1),
          confirmButtonColor: 'info' as const,
          iconBg: alpha(theme.palette.info.main, 0.2)
        };
      case 'success':
        return {
          icon: <SuccessIcon sx={{ fontSize: 48 }} />,
          color: theme.palette.success.main,
          bgColor: alpha(theme.palette.success.main, 0.1),
          confirmButtonColor: 'success' as const,
          iconBg: alpha(theme.palette.success.main, 0.2)
        };
      default:
        return {
          icon: <QuestionIcon sx={{ fontSize: 48 }} />,
          color: theme.palette.primary.main,
          bgColor: alpha(theme.palette.primary.main, 0.1),
          confirmButtonColor: 'primary' as const,
          iconBg: alpha(theme.palette.primary.main, 0.2)
        };
    }
  };

  const config = getVariantConfig();

  const getTransitionComponent = () => {
    switch (transition) {
      case 'slide': return SlideTransition;
      case 'fade': return Fade;
      default: return ZoomTransition;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      TransitionComponent={getTransitionComponent()}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          background: isDarkMode
            ? `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${alpha(theme.palette.grey[800], 0.9)} 100%)`
            : `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
          boxShadow: isDarkMode
            ? '0px 24px 48px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.3)'
            : '0px 24px 48px rgba(0, 0, 0, 0.15), 0px 8px 16px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(config.color, 0.1)}`,
          overflow: 'visible'
        },
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.common.black, isDarkMode ? 0.7 : 0.5),
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      {/* Header dengan Close Button */}
      <DialogTitle
        sx={{
          position: 'relative',
          textAlign: 'center',
          pb: 1,
          background: `linear-gradient(135deg, ${config.bgColor} 0%, ${alpha(config.color, 0.05)} 100%)`,
          borderBottom: `1px solid ${alpha(config.color, 0.1)}`
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          fontWeight={700}
          color={config.color}
        >
          {title}
        </Typography>
      </DialogTitle>

      {/* Content dengan Icon */}
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <Box
          sx={{
            mb: 3,
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: config.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: config.color,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${config.color}, transparent, ${config.color})`,
                animation: 'spin 3s linear infinite',
                opacity: 0.3,
                zIndex: -1
              },
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          >
            {config.icon}
          </Box>
        </Box>

        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            fontWeight: 500
          }}
        >
          {message}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Tindakan ini tidak dapat dibatalkan.
        </Typography>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 2,
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(config.color, 0.02)} 0%, transparent 100%)`
        }}
      >

        <Button
          onClick={onConfirm}
          variant="contained"
          size="large"
          color={config.confirmButtonColor}
          disabled={loading}
          sx={{
            minWidth: 120,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${config.color} 0%, ${alpha(config.color, 0.8)} 100%)`,
            boxShadow: `0 4px 16px ${alpha(config.color, 0.4)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(config.color, 0.9)} 0%, ${alpha(config.color, 0.7)} 100%)`,
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 24px ${alpha(config.color, 0.5)}`
            },
            '&:disabled': {
              background: alpha(config.color, 0.3),
              color: alpha(theme.palette.common.white, 0.7)
            },
            transition: 'all 0.2s ease-in-out',
            fontWeight: 600
          }}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>

        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          disabled={loading}
          sx={{
            minWidth: 120,
            borderRadius: 3,
            borderColor: alpha(theme.palette.grey[400], 0.5),
            color: theme.palette.text.secondary,
            '&:hover': {
              borderColor: theme.palette.grey[400],
              backgroundColor: alpha(theme.palette.grey[400], 0.1),
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${alpha(theme.palette.grey[400], 0.3)}`
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirm;