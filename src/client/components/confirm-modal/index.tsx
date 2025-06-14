'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type FormModalProps = {
  cancelButtonText?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  isOpen?: boolean;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  onClose?: () => void;
  onSubmit?: () => void;
  submitButtonText?: string;
  subTitle?: string;
  title?: string;
  titleColor?: string;
};

function ConfirmModal({
  title = '',
  titleColor = '#ED3A32',
  subTitle = '',
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  cancelButtonText = 'ยกเลิก',
  submitButtonText = 'ตกลง',
  maxWidth = 'sm',
  isLoading = false,
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
      <DialogTitle id='alert-dialog-title' sx={{ padding: '24px 24px 8px 24px', color: titleColor }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ paddingBottom: '8px' }}>
        <DialogContentText id='alert-dialog-description' sx={{ whiteSpace: 'pre' }}>
          {subTitle}
        </DialogContentText>

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

export { ConfirmModal };
