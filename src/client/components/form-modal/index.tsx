'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type FormModalProps = {
  cancelButtonText?: string;
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
  isLoading?: boolean;
  isOpen?: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  onClose?: () => void;
  onSubmit?: () => void;
  submitButtonText?: string;
  subTitle?: string;
  title?: string;
};

function FormModal({
  title = '',
  subTitle = '',
  headerChildren,
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  cancelButtonText = 'CANCEL',
  submitButtonText = 'SAVE',
  maxWidth = 'xs',
  isLoading = false,
  children,
}: FormModalProps) {
  return (
    <Dialog
      component='form'
      fullWidth
      maxWidth={maxWidth}
      onClose={onClose}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      open={isOpen}
      transitionDuration={{ exit: 0 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        {/* Header */}
        <Box sx={{ px: 3, pt: 2 }}>
          <Stack gap={1}>
            <Typography fontSize={18} fontWeight={600}>
              {title}
            </Typography>
            <Typography fontSize={14}>{subTitle}</Typography>
            {headerChildren}
          </Stack>
        </Box>

        {/* Scrollable Content */}
        <DialogContent
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          <Stack gap={2} sx={{ px: 2 }}>
            {children}
          </Stack>
        </DialogContent>

        {/* Fixed Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #e0e0e0',
            backgroundColor: 'background.paper',
          }}
        >
          <Stack direction='row' gap={1} justifyContent='end'>
            <Button color='inherit' disabled={isLoading} onClick={onClose} sx={{ color: '#707070' }} type='button'>
              {cancelButtonText}
            </Button>
            <LoadingButton loading={isLoading} type='submit'>
              {submitButtonText}
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
}

export { FormModal };
