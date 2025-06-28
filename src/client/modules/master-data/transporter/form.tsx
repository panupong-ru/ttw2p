import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { TransporterSchema, CreateTransporterSchema } from './schema';
import { createTransporterSchema } from './schema';

type TransporterFormProps = {
  info: {
    isOpen: boolean;
    data?: TransporterSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateTransporterSchema) => void;
};

function TransporterForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: TransporterFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransporterSchema>({
    resolver: zodResolver(createTransporterSchema),
  });

  useEffect(() => {
    if (info.data) {
      const { ...formData } = info.data;

      const resetData = {
        TransporterID: formData.TransporterID ?? '',
        TransporterName: formData.TransporterName ?? '',
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
      TransporterID: '',
      TransporterName: '',
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
              {info.data.TransporterID} : {info.data.TransporterName}
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
              name='TransporterID'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='รหัส'
                  error={!!errors.TransporterID}
                  helperText={errors.TransporterID?.message}
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
          name='TransporterName'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ชื่อ'
              error={!!errors.TransporterName}
              helperText={errors.TransporterName?.message}
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

export { TransporterForm };
