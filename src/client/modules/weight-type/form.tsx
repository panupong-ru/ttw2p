import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Controller, useForm, type ControllerRenderProps } from 'react-hook-form';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { FormModal } from '@/client/components/form-modal';
import type { WeightTypeSchema, CreateWeightTypeSchema } from './schema';
import { createWeightTypeSchema } from './schema';

type WeightTypeFormProps = {
  info: {
    isOpen: boolean;
    data?: WeightTypeSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateWeightTypeSchema) => void;
};
function FileInputRow({ field, label }: { field: ControllerRenderProps<CreateWeightTypeSchema>; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <TextField
        value={field.value || ''}
        fullWidth
        size='small'
        label={label}
        slotProps={{
          input: {
            tabIndex: -1,
            readOnly: true,
            onMouseDown: (e) => e.preventDefault(),
          },
        }}
        onClick={handleClick}
      />
      <Button variant='contained' size='small' sx={{ minWidth: 0, padding: 1 }} onClick={handleClick}>
        <FolderOpenIcon />
      </Button>
      <input
        ref={inputRef}
        type='file'
        hidden
        tabIndex={-1}
        onChange={(e) => {
          const fileInput = e.target as HTMLInputElement;
          const file = fileInput.files?.[0];
          if (file) {
            field.onChange(file.name);
          }
        }}
      />
    </Stack>
  );
}
function WeightTypeForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: WeightTypeFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWeightTypeSchema>({
    resolver: zodResolver(createWeightTypeSchema),
  });

  useEffect(() => {
    if (info.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      const { ...formData } = info.data;
      reset({
        WeightTypeID: formData.WeightTypeID ?? '',
        WeightTypeName: formData.WeightTypeName ?? '',
        FileRegisterTicketIn: formData.FileRegisterTicketIn ?? '',
        FileRegisterTicketOut: formData.FileRegisterTicketOut ?? '',
        FileAutoRegisterTicketIn: formData.FileAutoRegisterTicketIn ?? '',
        FileAutoRegisterTicketOut: formData.FileAutoRegisterTicketOut ?? '',
        FileTicketIn: formData.FileTicketIn ?? '',
        FileTicketOut: formData.FileTicketOut ?? '',
        FileAutoTicketIn: formData.FileAutoTicketIn ?? '',
        FileAutoTicketOut: formData.FileAutoTicketOut ?? '',
        FileTicketRFIDTag: formData.FileTicketRFIDTag ?? '',
        SequenceRegisterIn: formData.SequenceRegisterIn ?? '',
        SequenceRegisterOut: formData.SequenceRegisterOut ?? '',
        SequenceWeightIn: formData.SequenceWeightIn ?? '',
        SequenceWeightOut: formData.SequenceWeightOut ?? '',
        FlagPayment: formData.FlagPayment ?? '',
        FlagCancel: formData.FlagCancel ?? '',
      });
      return;
    }

    reset({
      WeightTypeID: '',
      WeightTypeName: '',
      FileRegisterTicketIn: '',
      FileRegisterTicketOut: '',
      FileAutoRegisterTicketIn: '',
      FileAutoRegisterTicketOut: '',
      FileTicketIn: '',
      FileTicketOut: '',
      FileAutoTicketIn: '',
      FileAutoTicketOut: '',
      FileTicketRFIDTag: '',
      SequenceRegisterIn: '',
      SequenceRegisterOut: '',
      SequenceWeightIn: '',
      SequenceWeightOut: '',
      FlagPayment: '',
      FlagCancel: '',
    });
  }, [info, reset]);

  const renderFileInput = (name: string, label: string) => (
    <Controller
      control={control}
      name={name as keyof CreateWeightTypeSchema}
      render={({ field }) => <FileInputRow field={field} label={label} />}
    />
  );

  return (
    <FormModal
      headerChildren={
        info.data && (
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize={14}>
              {info.data.WeightTypeID} : {info.data.WeightTypeName}
            </Typography>
          </Stack>
        )
      }
      isLoading={isLoading}
      isOpen={info.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText={`${!info.data ? 'บันทึก' : 'บันทึก'}`}
      cancelButtonText={`ยกเลิก`}
      subTitle={`ท่านกำลัง${!info.data ? 'เพิ่ม' : 'แก้ไข'}ข้อมูลประเภทชั่ง`}
      title={`${!info.data ? 'เพิ่ม' : 'แก้ไข'} ประเภทชั่ง`}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name='WeightTypeID'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='รหัส'
                  error={!!errors.WeightTypeID}
                  helperText={errors.WeightTypeID?.message}
                />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <Controller
              control={control}
              name='FlagPayment'
              render={({ field: { value, onChange, ...rest } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...rest}
                      checked={value === '1'}
                      onChange={(e) => onChange(e.target.checked ? '1' : '0')}
                    />
                  }
                  label='Payment'
                />
              )}
            />
            <Controller
              control={control}
              name='FlagCancel'
              render={({ field: { value, onChange, ...rest } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...rest}
                      checked={value === '1'}
                      onChange={(e) => onChange(e.target.checked ? '1' : '0')}
                    />
                  }
                  label='ยกเลิก'
                />
              )}
            />
          </Stack>
        </Box>

        <Controller
          control={control}
          name='WeightTypeName'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ชื่อ'
              error={!!errors.WeightTypeName}
              helperText={errors.WeightTypeName?.message}
            />
          )}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name='SequenceRegisterIn'
              render={({ field }) => <TextField {...field} size='small' label='Register Seq In' />}
            />
          </Stack>
          <Stack spacing={2}>
            <Controller
              control={control}
              name='SequenceRegisterOut'
              render={({ field }) => <TextField {...field} size='small' label='Register Seq Out' />}
            />
          </Stack>
        </Box>

        {renderFileInput('FileRegisterTicketIn', 'ไฟล์ตั๋วชั่งเข้า')}
        {renderFileInput('FileRegisterTicketOut', 'ไฟล์ตั๋วชั่งออก')}
        {renderFileInput('FileAutoRegisterTicketIn', 'ชั่งเข้า Auto')}
        {renderFileInput('FileAutoRegisterTicketOut', 'ชั่งออก Auto')}
        {renderFileInput('FileTicketIn', 'บัตรลงทะเบียนเข้า')}
        {renderFileInput('FileTicketOut', 'บัตรลงทะเบียนออก')}
        {renderFileInput('FileAutoTicketIn', 'บัตรชั่งเข้า Auto')}
        {renderFileInput('FileAutoTicketOut', 'บัตรชั่งออก Auto')}
        {renderFileInput('FileTicketRFIDTag', 'บัตร RFID/Barcode')}
      </Stack>
    </FormModal>
  );
}

export { WeightTypeForm };
