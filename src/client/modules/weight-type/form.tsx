import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

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

function WeightTypeForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: WeightTypeFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<CreateWeightTypeSchema>({
    resolver: zodResolver(createWeightTypeSchema),
  });

  useEffect(() => {
    if (info.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      const { DataID, HWID, DataHash, ...formData } = info.data;
      reset(formData);
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
      render={({ field }) => (
        <Stack direction='row' spacing={1} alignItems='center'>
          <TextField
            {...field}
            fullWidth
            size='small'
            label={label}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button variant='contained' component='label' size='small'>
            เลือก
            <input
              type='file'
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file.name);
                }
              }}
            />
          </Button>
        </Stack>
      )}
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
      subTitle={`ท่านกำลัง${!info.data ? 'เพิ่ม' : 'แก้ไข'}ข้อมูลการกำหนดลูกค้า รายการ Address`}
      title={`${!info.data ? 'เพิ่ม' : 'แก้ไข'} ประเภทชั่ง`}
    >
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
          <Stack spacing={2}>
            <Controller
              control={control}
              name='SequenceRegisterOut'
              render={({ field }) => <TextField {...field} size='small' label='Register Seq Out' />}
            />
            <Controller
              control={control}
              name='SequenceWeightIn'
              render={({ field }) => <TextField {...field} size='small' label='Weight Seq In' />}
            />
            <Controller
              control={control}
              name='SequenceWeightOut'
              render={({ field }) => <TextField {...field} size='small' label='Weight Seq Out' />}
            />
          </Stack>
        </Box>

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
      </Stack>
    </FormModal>
  );
}

export { WeightTypeForm };
