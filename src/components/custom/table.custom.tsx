import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Skeleton
} from '@mui/material';

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string | React.ReactNode;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
  icon: React.ReactNode;
  label: string;
  onClick: (row: any) => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  show?: (row: any) => boolean;
}

interface CustomTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  loading?: boolean;
  emptyMessage?: string;
  maxHeight?: number;
  stickyHeader?: boolean;
  hover?: boolean;
  size?: 'small' | 'medium';
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions = [],
  loading = false,
  emptyMessage = 'No data available',
  maxHeight = 440,
  stickyHeader = true,
  hover = true,
  size = 'medium'
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        {columns.map((column) => (
          <TableCell key={column.id}>
            <Skeleton
              variant="text"
              width="80%"
              sx={{
                bgcolor: isDarkMode ? alpha(theme.palette.grey[700], 0.3) : alpha(theme.palette.grey[300], 0.5)
              }}
            />
          </TableCell>
        ))}
        {actions.length > 0 && (
          <TableCell>
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={{
                bgcolor: isDarkMode ? alpha(theme.palette.grey[700], 0.3) : alpha(theme.palette.grey[300], 0.5)
              }}
            />
          </TableCell>
        )}
      </TableRow>
    ));
  };

  const renderEmptyState = () => (
    <TableRow>
      <TableCell
        colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
        align="center"
        sx={{
          py: 8,
          background: isDarkMode
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.8)} 0%, ${alpha(theme.palette.grey[100], 0.9)} 100%)`
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: isDarkMode ? theme.palette.grey[300] : theme.palette.grey[600],
              fontWeight: 500
            }}
          >
            {emptyMessage}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? theme.palette.grey[500] : theme.palette.grey[500]
            }}
          >
            No records found to display
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );

  const renderCellContent = (column: TableColumn, value: any, row: any) => {
    if (column.render) {
      return column.render(value, row);
    }

    if (column.format) {
      return column.format(value);
    }

    // Default rendering for common data types
    if (typeof value === 'boolean') {
      return (
        <Chip
          label={value ? 'Yes' : 'No'}
          color={value ? 'success' : 'default'}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 600,
            '& .MuiChip-label': {
              color: value ? '#fff' : isDarkMode ? theme.palette.grey[300] : theme.palette.grey[700]
            }
          }}
        />
      );
    }

    if (value === null || value === undefined) {
      return (
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? theme.palette.grey[500] : theme.palette.grey[400],
            fontStyle: 'italic'
          }}
        >
          -
        </Typography>
      );
    }

    return value;
  };

  const renderActionButtons = (row: any) => {
    if (actions.length === 0) return null;

    return (
      <TableCell
        align="center"
        sx={{
          minWidth: 120,
          background: isDarkMode
            ? alpha(theme.palette.background.paper, 0.5)
            : alpha(theme.palette.grey[50], 0.7)
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          {actions.map((action, index) => {
            if (action.show && !action.show(row)) return null;

            const actionColor = action.color || 'primary';

            return (
              <Tooltip key={index} title={action.label} arrow>
                <IconButton
                  size="small"
                  onClick={() => action.onClick(row)}
                  sx={{
                    color: theme.palette[actionColor].main,
                    backgroundColor: alpha(theme.palette[actionColor].main, 0.1),
                    border: `1px solid ${alpha(theme.palette[actionColor].main, 0.2)}`,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette[actionColor].main, 0.2),
                      border: `1px solid ${alpha(theme.palette[actionColor].main, 0.4)}`,
                      transform: 'scale(1.05)',
                      boxShadow: `0 4px 8px ${alpha(theme.palette[actionColor].main, 0.3)}`
                    },
                    transition: 'all 0.2s ease-in-out',
                    width: 32,
                    height: 32
                  }}
                >
                  {action.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
      </TableCell>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: `1px solid ${isDarkMode ? alpha(theme.palette.grey[700], 0.5) : alpha(theme.palette.grey[300], 0.5)}`,
        borderRadius: 3,
        background: isDarkMode
          ? `linear-gradient(145deg, ${theme.palette.grey[900]} 0%, ${alpha(theme.palette.grey[800], 0.8)} 100%)`
          : `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
        boxShadow: isDarkMode
          ? '0px 8px 32px rgba(0, 0, 0, 0.4), 0px 2px 8px rgba(0, 0, 0, 0.2)'
          : '0px 8px 32px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <TableContainer sx={{ maxHeight }}>
        <Table
          stickyHeader={stickyHeader}
          size={size}
          sx={{
            '& .MuiTableCell-root': {
              borderBottom: `1px solid ${isDarkMode ? alpha(theme.palette.grey[700], 0.3) : alpha(theme.palette.grey[300], 0.3)}`
            }
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
                      : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
                    borderBottom: `3px solid ${theme.palette.primary.main}`,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backdropFilter: 'blur(10px)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isDarkMode
                        ? alpha(theme.palette.background.paper, 0.1)
                        : alpha(theme.palette.background.paper, 0.8),
                      zIndex: -1
                    }
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell
                  align="center"
                  sx={{
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`
                      : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
                    borderBottom: `3px solid ${theme.palette.primary.main}`,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    minWidth: 120,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backdropFilter: 'blur(10px)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isDarkMode
                        ? alpha(theme.palette.background.paper, 0.1)
                        : alpha(theme.palette.background.paper, 0.8),
                      zIndex: -1
                    }
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              renderSkeletonRows()
            ) : data.length === 0 ? (
              renderEmptyState()
            ) : (
              data.map((row, index) => (
                <TableRow
                  hover={hover}
                  key={row.id || index}
                  sx={{
                    '&:nth-of-type(odd)': {
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${alpha(theme.palette.grey[800], 0.3)} 0%, ${alpha(theme.palette.grey[900], 0.2)} 100%)`
                        : `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.5)} 0%, ${alpha(theme.palette.grey[100], 0.3)} 100%)`
                    },
                    '&:nth-of-type(even)': {
                      background: isDarkMode
                        ? alpha(theme.palette.background.paper, 0.02)
                        : alpha(theme.palette.background.paper, 0.8)
                    },
                    '&:hover': hover ? {
                      background: isDarkMode
                        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`
                        : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      transform: 'translateY(-1px)',
                      boxShadow: isDarkMode
                        ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        : `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                      '& .MuiTableCell-root': {
                        color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
                        fontWeight: 500
                      }
                    } : {},
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: hover ? 'pointer' : 'default'
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        fontSize: '0.875rem',
                        color: isDarkMode ? theme.palette.grey[200] : theme.palette.grey[800],
                        fontWeight: 400,
                        padding: '16px 12px'
                      }}
                    >
                      {renderCellContent(column, row[column.id], row)}
                    </TableCell>
                  ))}
                  {renderActionButtons(row)}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;