import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Paper } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/client/components/form-modal';
import type { WeightSchema, CreateWeightSchema } from './schema';
import { createWeightSchema } from './schema';
import { useCustomerAPI } from '../customer/api';
import { useProductAPI } from '../product/api';
import { useDriverAPI } from '../driver/api';
import { useTransporterAPI } from '../transporter/api';
import { useWeightTypeAPI } from '../weight-type/api';
import { NumberInput } from '@/client/components/number-input';
import { useWeightUnitAPI } from '../weight-unit/api';
import { useRFIDTagAPI } from '../rfid-tag/api';

type WeightFormProps = {
  info: {
    isOpen: boolean;
    data?: WeightSchema;
  };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateWeightSchema) => void;
};
function WeightForm({ info, onClose, onSubmit = (_data) => {}, isLoading = false }: WeightFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWeightSchema>({
    resolver: zodResolver(createWeightSchema),
  });
  const { useGetRFIDTags } = useRFIDTagAPI();
  const { useGetWeightTypes } = useWeightTypeAPI();
  const { useGetCustomers } = useCustomerAPI();
  const { useGetProducts } = useProductAPI();
  const { useGetDrivers } = useDriverAPI();
  const { useGetTransporters } = useTransporterAPI();
  const { useGetWeightUnits } = useWeightUnitAPI();
  const { data: rfidTagData } = useGetRFIDTags(1, 100000);
  const { data: weightTypeData } = useGetWeightTypes(1, 100000);
  const { data: customerData } = useGetCustomers(1, 100000);
  const { data: productData } = useGetProducts(1, 100000);
  const { data: driverData } = useGetDrivers(1, 100000);
  const { data: transporterData } = useGetTransporters(1, 100000);
  const { data: weightUnitData } = useGetWeightUnits(1, 100000);

  const rfidTagDataOptions = useMemo(() => {
    return (
      rfidTagData?.result?.data?.map((item: { RFIDTagID: string | null }) => ({
        value: item.RFIDTagID ?? '',
        label: item.RFIDTagID ?? '',
      })) ?? []
    );
  }, [rfidTagData]);

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

  const productUnitData = useMemo(() => {
    return (
      weightUnitData?.result?.data?.map((item: { WeightUnitID: string }) => ({
        value: item.WeightUnitID,
      })) ?? []
    );
  }, [weightUnitData]);

  useEffect(() => {
    if (info.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      const { ...formData } = info.data;

      // สร้าง object สำหรับ reset form
      const resetData = {
        RFIDTagDataID: formData.RFIDTagDataID ?? '',
        FlagRegisterStatus: formData.FlagRegisterStatus ?? '',
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
  }, [info, reset]);

  return (
    <FormModal
      maxWidth='md'
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
      subTitle={`ท่านกำลัง${!info.data ? 'เพิ่ม' : 'แก้ไข'}ข้อมูลรถค้างชั่ง`}
      title={`${!info.data ? 'เพิ่ม' : 'แก้ไข'} รถค้างชั่ง`}
    >
      <Controller
        control={control}
        defaultValue=''
        name='RFIDTagDataID'
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            {...rest}
            fullWidth
            getOptionLabel={(option) => `${option.value}`}
            onChange={(_, data) => {
              onChange(data?.value ?? '');
            }}
            options={rfidTagDataOptions ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.RFIDTagDataID)}
                label='บัตร RFID'
                size='small'
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
            size='small'
            value={rfidTagDataOptions.find((item) => item.value === value) ?? null}
            sx={{ width: '49%' }}
          />
        )}
      />

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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'nowrap', width: '3%' }}>
          %
        </Typography>
        <Controller
          control={control}
          name='WeightAdjCal1'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หักเงิน 1'
              error={!!errors.WeightAdjCal1}
              helperText={errors.WeightAdjCal1?.message}
              sx={{ width: '47%' }}
            />
          )}
        />
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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'nowrap', width: '3%' }}>
          %
        </Typography>
        <Controller
          control={control}
          name='WeightAdjCal2'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หักเงิน 2'
              error={!!errors.WeightAdjCal2}
              helperText={errors.WeightAdjCal2?.message}
              sx={{ width: '47%' }}
            />
          )}
        />
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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'nowrap', width: '3%' }}>
          กก.
        </Typography>
        <Controller
          control={control}
          name='WeightAdjCal3'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หักเงิน 3'
              error={!!errors.WeightAdjCal3}
              helperText={errors.WeightAdjCal3?.message}
              sx={{ width: '47%' }}
            />
          )}
        />
      </Box>
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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'nowrap', width: '3%' }}>
          บาท / &nbsp;
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
              sx={{ width: '25%' }}
            />
          )}
        />
        <Controller
          control={control}
          name='KgToUnit'
          render={({ field }) => (
            <NumberInput
              disabled
              value={field.value}
              onChange={field.onChange}
              label=''
              error={!!errors.KgToUnit}
              helperText={errors.KgToUnit?.message}
              sx={{ width: '20%' }}
            />
          )}
        />
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
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size='small' sx={{ '& .MuiTableCell-root': { borderRight: '1px solid rgba(224, 224, 224, 1)' } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'warning.light' }}>
              <TableCell align='center' sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)', color: 'white' }}>
                รายการ
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                เลขที่
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                วันที่
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                เวลา
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                น้ำหนัก (กก.)
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                ผู้ชั่ง
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                เครื่องชั่ง
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                Auto
              </TableCell>
              <TableCell align='center' sx={{ color: 'white' }}>
                Sens
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)', backgroundColor: 'success.main', color: 'white' }}
                align='center'
              >
                เข้า
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </FormModal>
  );
}

export { WeightForm };
