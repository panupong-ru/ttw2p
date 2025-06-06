'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
      <DialogContent sx={{ paddingBottom: '8px' }}>
        <Stack gap={1} sx={{ paddingY: '8px' }}>
          <Typography fontSize={18} fontWeight={600}>
            {title}
          </Typography>
          <Typography fontSize={14}>{subTitle}</Typography>
          {headerChildren}
        </Stack>

        <Stack gap={2} sx={{ paddingX: '16px', paddingY: '16px' }}>
          {children}
        </Stack>

        <Stack direction='row' gap={1} justifyContent='end' sx={{ paddingY: '8px' }}>
          <Button color='inherit' disabled={isLoading} onClick={onClose} sx={{ color: '#707070' }} type='button'>
            {cancelButtonText}
          </Button>
          <LoadingButton loading={isLoading} type='submit'>
            {submitButtonText}
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export { FormModal };
