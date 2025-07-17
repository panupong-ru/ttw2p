import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { RFIDTagSchema, CreateRFIDTagSchema } from './schema';
import { createRFIDTagSchema } from './schema';
import { useCustomerAPI } from '../customer/api';
import { useProductAPI } from '../product/api';
import { useDriverAPI } from '../driver/api';
import { useTransporterAPI } from '../transporter/api';
import { useWeightTypeAPI } from '../weight-type/api';
import { NumberInput } from '@/client/components/number-input';

type RFIDTagFormProps = {
  info: {
    isOpen: boolean;
    data?: RFIDTagSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateRFIDTagSchema) => void;
};
function RFIDTagForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: RFIDTagFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateRFIDTagSchema>({
    resolver: zodResolver(createRFIDTagSchema),
  });
  const { useGetWeightTypes } = useWeightTypeAPI();
  const { useGetCustomers } = useCustomerAPI();
  const { useGetProducts } = useProductAPI();
  const { useGetDrivers } = useDriverAPI();
  const { useGetTransporters } = useTransporterAPI();

  const { data: weightTypeData } = useGetWeightTypes({}, 1, 100000);
  const { data: customerData } = useGetCustomers({}, 1, 100000);
  const { data: productData } = useGetProducts({}, 1, 100000);
  const { data: driverData } = useGetDrivers({}, 1, 100000);
  const { data: transporterData } = useGetTransporters({}, 1, 100000);

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
      productData?.result?.data?.map(
        (item: {
          ProductID: string;
          ProductName: string;
          ProductUnitDataID?: string | null;
          Price?: number | null;
        }) => ({
          value: item.ProductID,
          label: item.ProductName,
          productUnitDataID: item.ProductUnitDataID ?? '',
          price: item.Price ?? 0,
        })
      ) ?? []
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
      const resetData = {
        DataID: info.data.DataID ?? '',
        DataCenter: info.data.DataCenter ?? null,
        RFIDTagID: info.data.RFIDTagID ?? '',
        RFIDTagSerialNo: info.data.RFIDTagSerialNo ?? '',
        CarRegister: info.data.CarRegister ?? '',
        CarRegister2: info.data.CarRegister2 ?? '',
        WeightTypeDataID: info.data.WeightTypeDataID ?? '',
        CustomerDataID: info.data.CustomerDataID ?? '',
        ProductDataID: info.data.ProductDataID ?? '',
        TransporterDataID: info.data.TransporterDataID ?? '',
        DriverDataID: info.data.DriverDataID ?? '',
        SequenceWeight: info.data.SequenceWeight ?? '',
        WeightDate: info.data.WeightDate ? new Date(info.data.WeightDate) : null,
        WeightTime: info.data.WeightTime ? new Date(info.data.WeightTime) : null,
        Weight: info.data.Weight ?? 0,
        UserLogInDataID: info.data.UserLogInDataID ?? '',
        WeightAdjKey1: info.data.WeightAdjKey1 ?? 0,
        WeightAdjCal1: info.data.WeightAdjCal1 ?? 0,
        WeightAdjKey2: info.data.WeightAdjKey2 ?? 0,
        WeightAdjCal2: info.data.WeightAdjCal2 ?? 0,
        WeightAdjKey3: info.data.WeightAdjKey3 ?? 0,
        WeightAdjCal3: info.data.WeightAdjCal3 ?? 0,
        ProductUnitDataID: info.data.ProductUnitDataID ?? '',
        Price: info.data.Price ?? 0,
        Tax: info.data.Tax ?? 0,
        AmountAdjKey1: info.data.AmountAdjKey1 ?? 0,
        AmountAdjCal1: info.data.AmountAdjCal1 ?? 0,
        AmountAdjKey2: info.data.AmountAdjKey2 ?? 0,
        AmountAdjCal2: info.data.AmountAdjCal2 ?? 0,
        AmountAdjKey3: info.data.AmountAdjKey3 ?? 0,
        AmountAdjCal3: info.data.AmountAdjCal3 ?? 0,
        Remark1: info.data.Remark1 ?? '',
        Remark2: info.data.Remark2 ?? '',
        Remark3: info.data.Remark3 ?? '',
        Remark4: info.data.Remark4 ?? '',
        FlagCancel: info.data.FlagCancel ?? 'N',
        HWID: info.data.HWID ?? null,
        DataHash: info.data.DataHash ?? null,
      };
      reset(resetData);
      return;
    }

    // Reset form to initial empty state
    const initialData = {
      DataID: '',
      DataCenter: null,
      RFIDTagID: '',
      RFIDTagSerialNo: '',
      CarRegister: '',
      CarRegister2: '',
      WeightTypeDataID: '',
      CustomerDataID: '',
      ProductDataID: '',
      TransporterDataID: '',
      DriverDataID: '',
      SequenceWeight: '',
      WeightDate: null,
      WeightTime: null,
      Weight: 0,
      UserLogInDataID: '',
      WeightAdjKey1: 0,
      WeightAdjCal1: 0,
      WeightAdjKey2: 0,
      WeightAdjCal2: 0,
      WeightAdjKey3: 0,
      WeightAdjCal3: 0,
      ProductUnitDataID: '',
      Price: 0,
      Tax: 0,
      AmountAdjKey1: 0,
      AmountAdjCal1: 0,
      AmountAdjKey2: 0,
      AmountAdjCal2: 0,
      AmountAdjKey3: 0,
      AmountAdjCal3: 0,
      Remark1: '',
      Remark2: '',
      Remark3: '',
      Remark4: '',
      FlagCancel: 'N',
      HWID: null,
      DataHash: null,
    };
    reset(initialData);
  }, [info.data, reset]);

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
      subTitle={`ท่านกำลัง${!info.data ? 'เพิ่ม' : 'แก้ไข'}ข้อมูลบัตร RFID`}
      title={`${!info.data ? 'เพิ่ม' : 'แก้ไข'} บัตร RFID`}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Controller
          control={control}
          name='RFIDTagID'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='รหัส'
              error={!!errors.RFIDTagID}
              helperText={errors.RFIDTagID?.message}
              required
              sx={{ width: '50%' }}
            />
          )}
        />
        <Controller
          control={control}
          name='RFIDTagSerialNo'
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Serial No.'
              error={!!errors.RFIDTagSerialNo}
              helperText={errors.RFIDTagSerialNo?.message}
              sx={{ width: '50%' }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Controller
          control={control}
          name='CarRegister2'
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='ทะเบียนรถพวง'
              error={!!errors.CarRegister2}
              helperText={errors.CarRegister2?.message}
              sx={{ width: '50%' }}
            />
          )}
        />
      </Box>

      {/* <Controller
        control={control}
        name='Remark4'
        render={({ field }) => (
          <TextField
            {...field}
            size='small'
            label='ทะเบียนรถก่อนหน้า'
            error={!!errors.Remark4}
            helperText={errors.Remark4?.message}
            sx={{ width: '48%' }}
          />
        )}
      /> */}

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
              setValue('ProductUnitDataID', data?.productUnitDataID ?? '');
              setValue('Price', data?.price ?? 0);
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
          กก.
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

export { RFIDTagForm };
