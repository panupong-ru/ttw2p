import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { TruckSchema, CreateTruckSchema } from './schema';
import { createTruckSchema } from './schema';
import { useCustomerAPI } from '../customer/api';
import { useProductAPI } from '../product/api';
import { useDriverAPI } from '../driver/api';
import { useTransporterAPI } from '../transporter/api';
import { useWeightTypeAPI } from '../weight-type/api';
import { NumberInput } from '@/client/components/number-input';

type TruckFormProps = {
  info: {
    isOpen: boolean;
    data?: TruckSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateTruckSchema) => void;
};
function TruckForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: TruckFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTruckSchema>({
    resolver: zodResolver(createTruckSchema),
  });
  const { useGetWeightTypes } = useWeightTypeAPI();
  const { useGetCustomers } = useCustomerAPI();
  const { useGetProducts } = useProductAPI();
  const { useGetDrivers } = useDriverAPI();
  const { useGetTransporters } = useTransporterAPI();

  const { data: weightTypeData } = useGetWeightTypes(1, 100000);
  const { data: customerData } = useGetCustomers(1, 100000);
  const { data: productData } = useGetProducts(1, 100000);
  const { data: driverData } = useGetDrivers(1, 100000);
  const { data: transporterData } = useGetTransporters(1, 100000);

  const weightTypeOptions = useMemo(() => {
    return (
      weightTypeData?.result?.data?.map((item: { WeightTypeID: string; WeightTypeName: string }) => ({
        value: item.WeightTypeID,
        label: item.WeightTypeName,
      })) ?? []
    );
  }, [weightTypeData]);

  const customerOptions = useMemo(() => {
    return (
      customerData?.result?.data?.map((item: { CustomerID: string; CustomerName: string }) => ({
        value: item.CustomerID,
        label: item.CustomerName,
      })) ?? []
    );
  }, [customerData]);

  const productOptions = useMemo(() => {
    return (
      productData?.result?.data?.map((item: { ProductID: string; ProductName: string }) => ({
        value: item.ProductID,
        label: item.ProductName,
      })) ?? []
    );
  }, [productData]);

  const transporterOptions = useMemo(() => {
    return (
      transporterData?.result?.data?.map((item: { TransporterID: string; TransporterName: string }) => ({
        value: item.TransporterID,
        label: item.TransporterName,
      })) ?? []
    );
  }, [transporterData]);

  const driverOptions = useMemo(() => {
    return (
      driverData?.result?.data?.map((item: { DriverID: string; DriverName: string }) => ({
        value: item.DriverID,
        label: item.DriverName,
      })) ?? []
    );
  }, [driverData]);

  useEffect(() => {
    if (info.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      const { ...formData } = info.data;

      // สร้าง object สำหรับ reset form
      const resetData = {
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
  }, [info, reset]);

  return (
    <FormModal
      headerChildren={
        info.data && (
          <Stack direction='row' justifyContent='space-between'>
            <Typography fontSize={14}>
              {info.data.CarRegister} : {info.data.CarRegister2}
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
      subTitle={`ท่านกำลัง${!info.data ? 'เพิ่ม' : 'แก้ไข'}ข้อมูลรถบรรทุก`}
      title={`${!info.data ? 'เพิ่ม' : 'แก้ไข'} รถบรรทุก`}
    >
      <Controller
        control={control}
        name='CarRegister'
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='small'
            label='ทะเบียนรถ'
            error={!!errors.CarRegister}
            helperText={errors.CarRegister?.message}
            required
          />
        )}
      />

      <Controller
        control={control}
        defaultValue=''
        name='WeightTypeDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value} : ${option.label}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={weightTypeOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.WeightTypeDataID)}
                label='ประเภทชั่ง'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={weightTypeOptions?.find((item) => item.value === value) ?? null}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue=''
        name='CustomerDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value} : ${option.label}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={customerOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.CustomerDataID)}
                label='คู่ค้า'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={customerOptions?.find((item) => item.value === value) ?? null}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue=''
        name='ProductDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value} : ${option.label}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={productOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.ProductDataID)}
                label='สินค้า'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={productOptions?.find((item) => item.value === value) ?? null}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue=''
        name='TransporterDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value} : ${option.label}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={transporterOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.TransporterDataID)}
                label='ผู้ขนส่ง'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={transporterOptions?.find((item) => item.value === value) ?? null}
          />
        )}
      />

      <Controller
        control={control}
        defaultValue=''
        name='DriverDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value} : ${option.label}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={driverOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.DriverDataID)}
                label='พนักงานขับรถ'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={driverOptions?.find((item) => item.value === value) ?? null}
          />
        )}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Controller
          control={control}
          name='WeightAdjKey1'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักน้ำหนัก 1'
              error={!!errors.WeightAdjKey1}
              helperText={errors.WeightAdjKey1?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          %
        </Typography>
        <Controller
          control={control}
          name='AmountAdjCal1'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักเงิน 1'
              error={!!errors.AmountAdjCal1}
              helperText={errors.AmountAdjCal1?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          บาท
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Controller
          control={control}
          name='WeightAdjKey2'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักน้ำหนัก 2'
              error={!!errors.WeightAdjKey2}
              helperText={errors.WeightAdjKey2?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          %
        </Typography>
        <Controller
          control={control}
          name='AmountAdjCal2'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักเงิน 2'
              error={!!errors.AmountAdjCal2}
              helperText={errors.AmountAdjCal2?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          บาท
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Controller
          control={control}
          name='WeightAdjKey3'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักน้ำหนัก 3'
              error={!!errors.WeightAdjKey3}
              helperText={errors.WeightAdjKey3?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          %
        </Typography>
        <Controller
          control={control}
          name='AmountAdjCal3'
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              label='หักเงิน 3'
              error={!!errors.AmountAdjCal3}
              helperText={errors.AmountAdjCal3?.message}
              sx={{ width: '60%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary'>
          บาท
        </Typography>
      </Box>

      <Controller
        control={control}
        name='Remark1'
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='small'
            label='หมายเหตุ 1'
            error={!!errors.Remark1}
            helperText={errors.Remark1?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='Remark2'
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='small'
            label='หมายเหตุ 2'
            error={!!errors.Remark2}
            helperText={errors.Remark2?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='Remark3'
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            size='small'
            label='หมายเหตุ 3'
            error={!!errors.Remark3}
            helperText={errors.Remark3?.message}
          />
        )}
      />
    </FormModal>
  );
}

export { TruckForm };
