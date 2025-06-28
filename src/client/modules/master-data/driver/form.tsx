import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { DriverSchema, CreateDriverSchema } from './schema';
import { createDriverSchema } from './schema';

type DriverFormProps = {
  info: {
    isOpen: boolean;
    data?: DriverSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateDriverSchema) => void;
};

function DriverForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: DriverFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDriverSchema>({
    resolver: zodResolver(createDriverSchema),
  });

  useEffect(() => {
    if (info.data) {
      const { ...formData } = info.data;

      const resetData = {
        DriverID: formData.DriverID ?? '',
        DriverName: formData.DriverName ?? '',
        Address1: formData.Address1 ?? '',
        Address2: formData.Address2 ?? '',
        SequenceWeightIn: formData.SequenceWeightIn ?? '',
        SequenceWeightOut: formData.SequenceWeightOut ?? '',
        FlagCancel: formData.FlagCancel ?? '',
        HWID: formData.HWID ?? '',
        DataHash: formData.DataHash ?? '',
      };

      reset(resetData);
      return;
    }

    // Reset form to initial empty state
    const initialData = {
      DriverID: '',
      DriverName: '',
      Address1: '',
      Address2: '',
      SequenceWeightIn: '',
      SequenceWeightOut: '',
      FlagCancel: '',
      HWID: '',
      DataHash: '',
    };

    reset(initialData);
  }, [info, reset]);

  return (
    <FormModal
      headerChildren={
        info.data && (
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize={14}>
              {info.data.DriverID} : {info.data.DriverName}
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
              name='DriverID'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='รหัส'
                  error={!!errors.DriverID}
                  helperText={errors.DriverID?.message}
                />
              )}
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <Controller
              control={control}
              name='FlagCancel'
              render={({ field: { value, onChange, ...rest } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...rest}
                      checked={value === 'Y'}
                      onChange={(e) => onChange(e.target.checked ? 'Y' : 'N')}
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
          name='DriverName'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ชื่อ'
              error={!!errors.DriverName}
              helperText={errors.DriverName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='Address1'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ที่อยู่ 1'
              error={!!errors.Address1}
              helperText={errors.Address1?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='Address2'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ที่อยู่ 2'
              error={!!errors.Address2}
              helperText={errors.Address2?.message}
            />
          )}
        />
      </Stack>
    </FormModal>
  );
}

export { DriverForm };
