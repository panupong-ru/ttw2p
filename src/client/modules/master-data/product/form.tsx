import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { ProductSchema, CreateProductSchema } from './schema';
import { createProductSchema } from './schema';
import { useWeightUnitAPI } from '../weight-unit/api';
import { NumberInput } from '@/client/components/number-input';

type ProductFormProps = {
  info: {
    isOpen: boolean;
    data?: ProductSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateProductSchema) => void;
};

function ProductForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: ProductFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { useGetWeightUnits } = useWeightUnitAPI();

  const { data: weightUnitData } = useGetWeightUnits({}, 1, 1000);

  const productUnitData = useMemo(() => {
    return (
      weightUnitData?.result?.data?.map((item: { WeightUnitID: string }) => ({
        value: item.WeightUnitID,
      })) ?? []
    );
  }, [weightUnitData]);

  useEffect(() => {
    if (info.data) {
      const { ...formData } = info.data;

      const resetData = {
        ProductID: formData.ProductID ?? '',
        ProductName: formData.ProductName ?? '',
        ProductUnitDataID: formData.ProductUnitDataID ?? '',
        Price: formData.Price ?? 0,
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
      ProductID: '',
      ProductName: '',
      ProductUnitDataID: '',
      Price: 0,
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
              {info.data.ProductID} : {info.data.ProductName}
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
              name='ProductID'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='รหัส'
                  error={!!errors.ProductID}
                  helperText={errors.ProductID?.message}
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
          name='ProductName'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='ชื่อ'
              error={!!errors.ProductName}
              helperText={errors.ProductName?.message}
            />
          )}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Controller
            control={control}
            name='Price'
            render={({ field }) => (
              <NumberInput
                value={field.value}
                onChange={field.onChange}
                label='ราคาต่อหน่วย'
                error={!!errors.Price}
                helperText={errors.Price?.message}
                sx={{ width: '60%' }}
              />
            )}
          />
          <Typography variant='body2' color='text.secondary'>
            บาท
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            /
          </Typography>
          <Controller
            control={control}
            defaultValue=''
            name='ProductUnitDataID'
            render={({ field: { value, onChange, ...rest } }) => (
              <Autocomplete
                {...rest}
                fullWidth
                getOptionLabel={(option) => `${option.value}`}
                onChange={(_, data) => {
                  onChange(data?.value ?? '');
                }}
                options={productUnitData ?? []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(errors.ProductUnitDataID)}
                    label='หน่วยสินค้า'
                    size='small'
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
                size='small'
                value={productUnitData?.find((item) => item.value === value) ?? null}
                sx={{ width: '40%' }}
              />
            )}
          />
        </Box>
      </Stack>
    </FormModal>
  );
}

export { ProductForm };
