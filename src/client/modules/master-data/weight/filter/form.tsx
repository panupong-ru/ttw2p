import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, TextField, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { WeightSchema, CreateWeightSchema } from './schema';
import { createWeightSchema } from './schema';
import { NumberInput } from '@/client/components/number-input';
import { useWeightAPI } from './api';

function FilterForm() {
  const { createWeight, updateWeight } = useWeightAPI();

  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightSchema }>({
    isOpen: false,
  });

  const handleFormSubmit = async (data: CreateWeightSchema) => {
    if (formInfo.data) {
      await updateWeight.mutateAsync({
        id: String(formInfo.data.DataID),
        data,
      });
    } else {
      await createWeight.mutateAsync(data);
    }
    setFormInfo({ isOpen: false });
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWeightSchema>({
    resolver: zodResolver(createWeightSchema),
  });

  useEffect(() => {
    if (formInfo.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      const { ...formData } = formInfo.data;

      // สร้าง object สำหรับ reset form
      const resetData = {
        DataID: formData.DataID ?? '',
        DataCenter: formData.DataCenter ?? '',
        DocID: formData.DocID ?? '',
        DocNoIn: formData.DocNoIn ?? '',
        DocNoOut: formData.DocNoOut ?? '',
        WeightModeDataID: formData.WeightModeDataID ?? '',
        CarRegister: formData.CarRegister ?? '',
        CarRegister2: formData.CarRegister2 ?? '',
        WeightTypeDataID: formData.WeightTypeDataID ?? '',
        CustomerDataID: formData.CustomerDataID ?? '',
        ProductDataID: formData.ProductDataID ?? '',
        TransporterDataID: formData.TransporterDataID ?? '',
        DriverDataID: formData.DriverDataID ?? '',
        WeightAdjKey1: formData.WeightAdjKey1 ?? 0,
        WeightAdjCal1: formData.WeightAdjCal1 ?? 0,
        WeightAdjKey2: formData.WeightAdjKey2 ?? 0,
        WeightAdjCal2: formData.WeightAdjCal2 ?? 0,
        WeightAdjKey3: formData.WeightAdjKey3 ?? 0,
        WeightAdjCal3: formData.WeightAdjCal3 ?? 0,
        AmountAdjCal1: formData.AmountAdjCal1 ?? 0,
        AmountAdjCal2: formData.AmountAdjCal2 ?? 0,
        AmountAdjCal3: formData.AmountAdjCal3 ?? 0,
        Remark1: formData.Remark1 ?? '',
        Remark2: formData.Remark2 ?? '',
        Remark3: formData.Remark3 ?? '',
      };

      reset(resetData);
      return;
    }

    // Reset form to initial empty state
    const initialData = {
      RFIDTagID: '',
      RFIDTagSerialNo: '',
      CarRegister: '',
      CarRegister2: '',
      WeightTypeDataID: '',
      CustomerDataID: '',
      ProductDataID: '',
      TransporterDataID: '',
      DriverDataID: '',
      WeightAdjKey1: 0,
      WeightAdjCal1: 0,
      WeightAdjKey2: 0,
      WeightAdjCal2: 0,
      WeightAdjKey3: 0,
      WeightAdjCal3: 0,
      AmountAdjCal1: 0,
      AmountAdjCal2: 0,
      AmountAdjCal3: 0,
      Remark1: '',
      Remark2: '',
      Remark3: '',
    };

    reset(initialData);
  }, [formInfo, reset]);

  return (
    <>
      <Stack sx={{ width: '100%', gap: 2, pt: 2 }}>
        <Typography variant='body1'>การคำนวณ</Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='WeightAdjKey1'
              render={({ field }) => (
                <NumberInput
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  label='ทศนิยมน้ำหนักหักคีย์'
                  error={!!errors.WeightAdjKey1}
                  helperText={errors.WeightAdjKey1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='Remark1'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ทศนิยมน้ำหนักคำนวณ'
                  error={!!errors.Remark1}
                  helperText={errors.Remark1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='WeightAdjKey1'
              render={({ field }) => (
                <NumberInput
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  label='ทศนิยมน้ำหนักสุทธิ'
                  error={!!errors.WeightAdjKey1}
                  helperText={errors.WeightAdjKey1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='Remark1'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ทศนิยมราคา'
                  error={!!errors.Remark1}
                  helperText={errors.Remark1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='WeightAdjKey1'
              render={({ field }) => (
                <NumberInput
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  label='ทศนิยมเงิน'
                  error={!!errors.WeightAdjKey1}
                  helperText={errors.WeightAdjKey1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='Remark1'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ทศนิยมเงินหัก'
                  error={!!errors.Remark1}
                  helperText={errors.Remark1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name='Remark1'
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  label='ทศนิยมเงินสุทธิ'
                  error={!!errors.Remark1}
                  helperText={errors.Remark1?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack direction='row' spacing={2} justifyContent='flex-end' py={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit(handleFormSubmit)}
          fullWidth={false}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            order: { xs: 2, sm: 0 },
          }}
        >
          บันทึก
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => setFormInfo({ isOpen: false })}
          fullWidth={false}
          sx={{
            minWidth: { xs: '100%', sm: 'auto' },
            order: { xs: 1, sm: 0 },
          }}
        >
          ยกเลิก
        </Button>
      </Stack>
    </>
  );
}

export { FilterForm };
