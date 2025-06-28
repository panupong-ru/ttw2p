import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { WeightUnitSchema, CreateWeightUnitSchema } from './schema';
import { createWeightUnitSchema } from './schema';
import { NumberInput } from '@/client/components/number-input';

type WeightUnitFormProps = {
  info: {
    isOpen: boolean;
    data?: WeightUnitSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateWeightUnitSchema) => void;
};

function WeightUnitForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: WeightUnitFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWeightUnitSchema>({
    resolver: zodResolver(createWeightUnitSchema),
  });

  const productUnitData = [{ value: 'Kg' }, { value: 'Ton' }];

  useEffect(() => {
    if (info.data) {
      const { ...formData } = info.data;

      const resetData = {
        WeightUnitID: formData.WeightUnitID ?? '',
        WeightUnitName: formData.WeightUnitName ?? '',
        KgToUnit: formData.KgToUnit ?? 0,
        FlagCancel: formData.FlagCancel ?? '',
        HWID: formData.HWID ?? '',
        DataHash: formData.DataHash ?? '',
      };

      reset(resetData);
      return;
    }

    // Reset form to initial empty state
    const initialData = {
      WeightUnitID: '',
      WeightUnitName: '',
      KgToUnit: 0,
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
              {info.data.WeightUnitID} : {info.data.WeightUnitName}
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
              name='WeightUnitID'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ชื่อย่อ'
                  error={!!errors.WeightUnitID}
                  helperText={errors.WeightUnitID?.message}
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
          name='WeightUnitName'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ชื่อเต็ม'
              error={!!errors.WeightUnitName}
              helperText={errors.WeightUnitName?.message}
            />
          )}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Controller
            control={control}
            name='KgToUnit'
            render={({ field }) => (
              <NumberInput
                value={field.value}
                onChange={field.onChange}
                label='น้ำหนัก/หน่วย'
                error={!!errors.KgToUnit}
                helperText={errors.KgToUnit?.message}
                sx={{ width: '48%' }}
              />
            )}
          />
          <Typography fontSize={14}>กิโลกรัม</Typography>
        </Box>
      </Stack>
    </FormModal>
  );
}

export { WeightUnitForm };
