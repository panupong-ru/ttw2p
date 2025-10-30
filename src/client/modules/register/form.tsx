import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useEffect, useMemo, forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { WeightSchema, CreateWeightSchema } from '@/client/modules/master-data/weight/schema';
import { createWeightSchema } from '@/client/modules/master-data/weight/schema';
import { useCustomerAPI } from '@/client/modules/master-data/customer/api';
import { useProductAPI } from '@/client/modules/master-data/product/api';
import { useDriverAPI } from '@/client/modules/master-data/driver/api';
import { useTransporterAPI } from '@/client/modules/master-data/transporter/api';
import { useWeightTypeAPI } from '@/client/modules/master-data/weight-type/api';
import { NumberInput } from '@/client/components/number-input';
import { useWeightUnitAPI } from '@/client/modules/master-data/weight-unit/api';
import { useRFIDTagAPI } from '../master-data/rfid-tag/api';
import { useWeightAPI } from '@/client/modules/master-data/weight/api';
import { getThaiDate } from '@/core/utils/date-format';

type RegisterFormProps = {
  info: {
    isOpen: boolean;
    data?: WeightSchema;
  };
  onSubmit?: (data: CreateWeightSchema) => void;
};

export type RegisterFormRef = {
  submitForm: () => void;
  resetForm: () => void;
};

const RegisterForm = forwardRef<RegisterFormRef, RegisterFormProps>(function RegisterForm(
  { info, onSubmit = (_data) => {} },
  ref
) {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateWeightSchema>({
    resolver: zodResolver(createWeightSchema),
  });

  const [weightFilters, setWeightFilters] = useState<Record<string, any>>({});
  const [isCarRegister2Disabled, setIsCarRegister2Disabled] = useState(false);

  const { useGetRFIDTags } = useRFIDTagAPI();
  const { useGetWeightTypes } = useWeightTypeAPI();
  const { useGetCustomers } = useCustomerAPI();
  const { useGetProducts } = useProductAPI();
  const { useGetDrivers } = useDriverAPI();
  const { useGetTransporters } = useTransporterAPI();
  const { useGetWeightUnits } = useWeightUnitAPI();
  const { useGetWeights } = useWeightAPI();

  const { data: weightData } = useGetWeights(weightFilters, 1, 1, !!weightFilters?.CarRegister);
  const { data: rfidTagData } = useGetRFIDTags({}, 1, 100000);
  const { data: weightTypeData } = useGetWeightTypes({}, 1, 100000);
  const { data: customerData } = useGetCustomers({}, 1, 100000);
  const { data: productData } = useGetProducts({}, 1, 100000);
  const { data: driverData } = useGetDrivers({}, 1, 100000);
  const { data: transporterData } = useGetTransporters({}, 1, 100000);
  const { data: weightUnitData } = useGetWeightUnits({}, 1, 100000);

  const populateForm = useCallback(
    (formData: WeightSchema) => {
      if (formData.FlagCancel == 'N') {
        // Set values for all fields except RFIDTagDataID
        setValue('DocID', formData.DocID ?? null);
        setValue('DocNoIn', formData.DocNoIn ?? null);
        setValue('DocNoOut', formData.DocNoOut ?? null);
        setValue('WeightModeDataID', formData.WeightModeDataID ?? null);
        setValue('TruckDataID', formData.TruckDataID ?? null);
        setValue('WeightTypeDataID', formData.WeightTypeDataID ?? null);
        setValue('CustomerDataID', formData.CustomerDataID ?? null);
        setValue('ProductDataID', formData.ProductDataID ?? null);
        setValue('TransporterDataID', formData.TransporterDataID ?? null);
        setValue('DriverDataID', formData.DriverDataID ?? null);
        setValue('SequenceWeightIn', formData.SequenceWeightIn ?? null);
        setValue('WeightDateIn', formData.WeightDateIn ?? null);
        setValue('WeightTimeIn', formData.WeightTimeIn ?? null);
        setValue('WeightIn', formData.WeightIn ?? null);
        setValue('UserLogInDataIDIn', formData.UserLogInDataIDIn ?? null);
        setValue('WeightScaleIDIn', formData.WeightScaleIDIn ?? null);
        setValue('TicketPrintCountIn', formData.TicketPrintCountIn ?? null);
        setValue('SequenceWeightOut', formData.SequenceWeightOut ?? null);
        setValue('WeightDateOut', formData.WeightDateOut ?? null);
        setValue('WeightTimeOut', formData.WeightTimeOut ?? null);
        setValue('WeightOut', formData.WeightOut ?? null);
        setValue('UserLogInDataIDOut', formData.UserLogInDataIDOut ?? null);
        setValue('WeightScaleIDOut', formData.WeightScaleIDOut ?? null);
        setValue('TicketPrintCountOut', formData.TicketPrintCountOut ?? null);
        setValue('Weight', formData.Weight ?? null);
        setValue('WeightAdjust', formData.WeightAdjust ?? null);
        setValue('AdjustPercent', formData.AdjustPercent ?? null);
        setValue('AdjustPercentWeight', formData.AdjustPercentWeight ?? null);
        setValue('WeightAdjKey1', formData.WeightAdjKey1 ?? null);
        setValue('WeightAdjCal1', formData.WeightAdjCal1 ?? null);
        setValue('WeightAdjKey2', formData.WeightAdjKey2 ?? null);
        setValue('WeightAdjCal2', formData.WeightAdjCal2 ?? null);
        setValue('WeightAdjKey3', formData.WeightAdjKey3 ?? null);
        setValue('WeightAdjCal3', formData.WeightAdjCal3 ?? null);
        setValue('WeightNet', formData.WeightNet ?? null);
        setValue('Price', formData.Price ?? null);
        setValue('Tax', formData.Tax ?? null);
        setValue('ProductUnitDataID', formData.ProductUnitDataID ?? null);
        setValue('KgToUnit', formData.KgToUnit ?? null);
        setValue('Amount', formData.Amount ?? null);
        setValue('AmountAdjKey1', formData.AmountAdjKey1 ?? null);
        setValue('AmountAdjCal1', formData.AmountAdjCal1 ?? null);
        setValue('AmountAdjKey2', formData.AmountAdjKey2 ?? null);
        setValue('AmountAdjCal2', formData.AmountAdjCal2 ?? null);
        setValue('AmountAdjKey3', formData.AmountAdjKey3 ?? null);
        setValue('AmountAdjCal3', formData.AmountAdjCal3 ?? null);
        setValue('AmountNet', formData.AmountNet ?? null);
        setValue('Remark1', formData.Remark1 ?? null);
        setValue('Remark2', formData.Remark2 ?? null);
        setValue('Remark3', formData.Remark3 ?? null);
        setValue('Remark4', formData.Remark4 ?? null);
        setValue('SequenceRegisterIn', formData.SequenceRegisterIn ?? null);
        setValue('RegisterDateOut', formData.RegisterDateOut ?? null);
        setValue('RegisterTimeOut', formData.RegisterTimeOut ?? null);
        setValue('RegisterDateIn', formData.RegisterDateIn ?? getThaiDate());
        setValue('RegisterTimeIn', formData.RegisterTimeIn ?? getThaiDate());
        setValue('UserLogInDataIDRegisterIn', formData.UserLogInDataIDRegisterIn ?? null);
        setValue('RegisterStationIDIn', formData.RegisterStationIDIn ?? null);
        setValue('SequenceRegisterOut', formData.SequenceRegisterOut ?? null);
        setValue('UserLogInDataIDRegisterOut', formData.UserLogInDataIDRegisterOut ?? null);
        setValue('RegisterStationIDOut', formData.RegisterStationIDOut ?? null);
        setValue('FlagRegisterStatus', formData.FlagRegisterStatus ?? 'Y');
        setValue('FlagAutoSaveIn', formData.FlagAutoSaveIn ?? null);
        setValue('FlagAutoSaveOut', formData.FlagAutoSaveOut ?? null);
        setValue('FlagPlatformEdgeSensorIn', formData.FlagPlatformEdgeSensorIn ?? null);
        setValue('FlagPlatformEdgeSensorOut', formData.FlagPlatformEdgeSensorOut ?? null);
        setValue('FlagStatus', formData.FlagStatus ?? null);
        setValue('FlagComplete', formData.FlagComplete ?? null);
        setValue('FlagPayment', formData.FlagPayment ?? null);
        setValue('PaymentDataID', formData.PaymentDataID ?? null);
        setValue('PaymentDate', formData.PaymentDate ?? null);
        setValue('PaymentTime', formData.PaymentTime ?? null);
        setValue('PaymentUserLogInDataID', formData.PaymentUserLogInDataID ?? null);
        setValue('WeightNetStandard', formData.WeightNetStandard ?? 0);
        setValue('WeightNetTolerancePositive', formData.WeightNetTolerancePositive ?? 0);
        setValue('WeightNetToleranceNegative', formData.WeightNetToleranceNegative ?? 0);
        setValue('WeightNetApproveUserLogInDataID', formData.WeightNetApproveUserLogInDataID ?? null);
        setValue('FlagCancel', formData.FlagCancel ?? 'Y');
        setValue('HWID', formData.HWID ?? null);
        setValue('ExtendedData', formData.ExtendedData ?? null);
        setValue('DataHash', formData.DataHash ?? null);
        setValue('FlagUploadIn', formData.FlagUploadIn ?? null);
        setValue('FlagUploadOut', formData.FlagUploadOut ?? null);
      } else {
        // Set values for all fields except RFIDTagDataID
        setValue('DocID', null);
        setValue('DocNoIn', null);
        setValue('DocNoOut', null);
        setValue('WeightModeDataID', null);
        setValue('TruckDataID', null);
        setValue('WeightTypeDataID', null);
        setValue('CustomerDataID', null);
        setValue('ProductDataID', null);
        setValue('TransporterDataID', null);
        setValue('DriverDataID', null);
        setValue('SequenceWeightIn', null);
        setValue('WeightDateIn', null);
        setValue('WeightTimeIn', null);
        setValue('WeightIn', null);
        setValue('UserLogInDataIDIn', null);
        setValue('WeightScaleIDIn', null);
        setValue('TicketPrintCountIn', null);
        setValue('SequenceWeightOut', null);
        setValue('WeightDateOut', null);
        setValue('WeightTimeOut', null);
        setValue('WeightOut', null);
        setValue('UserLogInDataIDOut', null);
        setValue('WeightScaleIDOut', null);
        setValue('TicketPrintCountOut', null);
        setValue('Weight', null);
        setValue('WeightAdjust', null);
        setValue('AdjustPercent', null);
        setValue('AdjustPercentWeight', null);
        setValue('WeightAdjKey1', null);
        setValue('WeightAdjCal1', null);
        setValue('WeightAdjKey2', null);
        setValue('WeightAdjCal2', null);
        setValue('WeightAdjKey3', null);
        setValue('WeightAdjCal3', null);
        setValue('WeightNet', null);
        setValue('Price', null);
        setValue('Tax', null);
        setValue('ProductUnitDataID', null);
        setValue('KgToUnit', null);
        setValue('Amount', null);
        setValue('AmountAdjKey1', null);
        setValue('AmountAdjCal1', null);
        setValue('AmountAdjKey2', null);
        setValue('AmountAdjCal2', null);
        setValue('AmountAdjKey3', null);
        setValue('AmountAdjCal3', null);
        setValue('AmountNet', null);
        setValue('Remark1', null);
        setValue('Remark2', null);
        setValue('Remark3', null);
        setValue('Remark4', null);
        setValue('SequenceRegisterIn', null);
        setValue('RegisterDateOut', null);
        setValue('RegisterTimeOut', null);
        setValue('RegisterDateIn', formData.RegisterDateIn ?? getThaiDate());
        setValue('RegisterTimeIn', formData.RegisterTimeIn ?? getThaiDate());
        setValue('UserLogInDataIDRegisterIn', null);
        setValue('RegisterStationIDIn', null);
        setValue('SequenceRegisterOut', null);
        setValue('UserLogInDataIDRegisterOut', null);
        setValue('RegisterStationIDOut', null);
        setValue('FlagRegisterStatus', '');
        setValue('FlagAutoSaveIn', null);
        setValue('FlagAutoSaveOut', null);
        setValue('FlagPlatformEdgeSensorIn', null);
        setValue('FlagPlatformEdgeSensorOut', null);
        setValue('FlagStatus', null);
        setValue('FlagComplete', null);
        setValue('FlagPayment', null);
        setValue('PaymentDataID', null);
        setValue('PaymentDate', null);
        setValue('PaymentTime', null);
        setValue('PaymentUserLogInDataID', null);
        setValue('WeightNetStandard', 0);
        setValue('WeightNetTolerancePositive', 0);
        setValue('WeightNetToleranceNegative', 0);
        setValue('WeightNetApproveUserLogInDataID', null);
        setValue('FlagCancel', null);
        setValue('HWID', null);
        setValue('ExtendedData', null);
        setValue('DataHash', null);
        setValue('FlagUploadIn', null);
        setValue('FlagUploadOut', null);

        if (formData.CarRegister2) {
          setIsCarRegister2Disabled(true);
        } else {
          setIsCarRegister2Disabled(false);
        }
      }
    },
    [setValue]
  );

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    },
    resetForm: () => {
      setIsCarRegister2Disabled(false);
      // Reset form to initial empty state
      const initialData = {
        DataID: '',
        DataCenter: null,
        DocID: null,
        DocNoIn: null,
        DocNoOut: null,
        WeightModeDataID: null,
        CarRegister: null,
        CarRegister2: null,
        TruckDataID: null,
        RFIDTagDataID: null,
        WeightTypeDataID: null,
        CustomerDataID: null,
        ProductDataID: null,
        TransporterDataID: null,
        DriverDataID: null,
        SequenceWeightIn: null,
        WeightDateIn: null,
        WeightTimeIn: null,
        WeightIn: null,
        UserLogInDataIDIn: null,
        WeightScaleIDIn: null,
        TicketPrintCountIn: null,
        SequenceWeightOut: null,
        WeightDateOut: null,
        WeightTimeOut: null,
        WeightOut: null,
        UserLogInDataIDOut: null,
        WeightScaleIDOut: null,
        TicketPrintCountOut: null,
        Weight: null,
        WeightAdjust: null,
        AdjustPercent: null,
        AdjustPercentWeight: null,
        WeightAdjKey1: null,
        WeightAdjCal1: null,
        WeightAdjKey2: null,
        WeightAdjCal2: null,
        WeightAdjKey3: null,
        WeightAdjCal3: null,
        WeightNet: null,
        Price: null,
        Tax: null,
        ProductUnitDataID: null,
        KgToUnit: null,
        Amount: null,
        AmountAdjKey1: null,
        AmountAdjCal1: null,
        AmountAdjKey2: null,
        AmountAdjCal2: null,
        AmountAdjKey3: null,
        AmountAdjCal3: null,
        AmountNet: null,
        Remark1: null,
        Remark2: null,
        Remark3: null,
        Remark4: null,
        SequenceRegisterIn: null,
        RegisterDateIn: null,
        RegisterTimeIn: null,
        UserLogInDataIDRegisterIn: null,
        RegisterStationIDIn: null,
        SequenceRegisterOut: null,
        RegisterDateOut: null,
        RegisterTimeOut: null,
        UserLogInDataIDRegisterOut: null,
        RegisterStationIDOut: null,
        FlagRegisterStatus: '',
        FlagAutoSaveIn: null,
        FlagAutoSaveOut: null,
        FlagPlatformEdgeSensorIn: null,
        FlagPlatformEdgeSensorOut: null,
        FlagStatus: null,
        FlagComplete: null,
        FlagPayment: null,
        PaymentDataID: null,
        PaymentDate: null,
        PaymentTime: null,
        PaymentUserLogInDataID: null,
        WeightNetStandard: 0,
        WeightNetTolerancePositive: 0,
        WeightNetToleranceNegative: 0,
        WeightNetApproveUserLogInDataID: null,
        FlagCancel: null,
        HWID: null,
        ExtendedData: null,
        DataHash: null,
        FlagUploadIn: null,
        FlagUploadOut: null,
      };

      reset(initialData);
    },
  }));

  useEffect(() => {
    if (weightData?.result?.data?.[0]) {
      populateForm(weightData.result.data[0]);
    } else {
      populateForm({} as WeightSchema);
    }
  }, [weightData, populateForm]);

  const rfidTagDataOptions = useMemo(() => {
    return (
      rfidTagData?.result?.data?.map(
        (item: { RFIDTagID: string | null; CarRegister: string | null; CarRegister2: string | null }) => ({
          value: item.RFIDTagID ?? '',
          label: item.RFIDTagID ?? '',
          carRegister: item.CarRegister ?? '',
          carRegister2: item.CarRegister2 ?? '',
        })
      ) ?? []
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
      productData?.result?.data?.map(
        (item: {
          ProductID: string;
          ProductName: string;
          Price?: number | null;
          ProductUnitDataID?: string | null;
        }) => ({
          value: item.ProductID,
          label: item.ProductName,
          price: item.Price ?? 0,
          productUnitDataID: item.ProductUnitDataID ?? '',
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

  const productUnitData = useMemo(() => {
    return (
      weightUnitData?.result?.data?.map((item: { WeightUnitID: string; KgToUnit?: number | null }) => ({
        value: item.WeightUnitID,
        kgToUnit: item.KgToUnit ?? 0,
      })) ?? []
    );
  }, [weightUnitData]);

  const flagRegisterStatus = watch('FlagRegisterStatus');

  const header = useMemo(() => {
    if (flagRegisterStatus === 'N' && getValues('SequenceRegisterIn') === null) {
      return (
        <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#000000' }}>
          เข้า
        </Typography>
      );
    } else if (flagRegisterStatus === 'N' && getValues('SequenceRegisterIn') != null) {
      return (
        <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#000000' }}>
          ออก
        </Typography>
      );
    } else if (flagRegisterStatus === 'Y') {
      return (
        <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#000000' }}>
          ลงทะเบียน
        </Typography>
      );
    }
  }, [flagRegisterStatus, getValues]);

  useEffect(() => {
    if (info.data) {
      // Omit DataID, HWID, and DataHash when setting form data
      populateForm(info.data);
      return;
    }

    // Reset form to initial empty state
    const initialData = {
      DataID: '',
      DataCenter: null,
      DocID: null,
      DocNoIn: null,
      DocNoOut: null,
      WeightModeDataID: null,
      CarRegister: null,
      CarRegister2: null,
      TruckDataID: null,
      RFIDTagDataID: null,
      WeightTypeDataID: null,
      CustomerDataID: null,
      ProductDataID: null,
      TransporterDataID: null,
      DriverDataID: null,
      SequenceWeightIn: null,
      WeightDateIn: null,
      WeightTimeIn: null,
      WeightIn: null,
      UserLogInDataIDIn: null,
      WeightScaleIDIn: null,
      TicketPrintCountIn: null,
      SequenceWeightOut: null,
      WeightDateOut: null,
      WeightTimeOut: null,
      WeightOut: null,
      UserLogInDataIDOut: null,
      WeightScaleIDOut: null,
      TicketPrintCountOut: null,
      Weight: null,
      WeightAdjust: null,
      AdjustPercent: null,
      AdjustPercentWeight: null,
      WeightAdjKey1: null,
      WeightAdjCal1: null,
      WeightAdjKey2: null,
      WeightAdjCal2: null,
      WeightAdjKey3: null,
      WeightAdjCal3: null,
      WeightNet: null,
      Price: null,
      Tax: null,
      ProductUnitDataID: null,
      KgToUnit: null,
      Amount: null,
      AmountAdjKey1: null,
      AmountAdjCal1: null,
      AmountAdjKey2: null,
      AmountAdjCal2: null,
      AmountAdjKey3: null,
      AmountAdjCal3: null,
      AmountNet: null,
      Remark1: null,
      Remark2: null,
      Remark3: null,
      Remark4: null,
      SequenceRegisterIn: null,
      RegisterDateIn: null,
      RegisterTimeIn: null,
      UserLogInDataIDRegisterIn: null,
      RegisterStationIDIn: null,
      SequenceRegisterOut: null,
      RegisterDateOut: null,
      RegisterTimeOut: null,
      UserLogInDataIDRegisterOut: null,
      RegisterStationIDOut: null,
      FlagRegisterStatus: '',
      FlagAutoSaveIn: null,
      FlagAutoSaveOut: null,
      FlagPlatformEdgeSensorIn: null,
      FlagPlatformEdgeSensorOut: null,
      FlagStatus: null,
      FlagComplete: null,
      FlagPayment: null,
      PaymentDataID: null,
      PaymentDate: null,
      PaymentTime: null,
      PaymentUserLogInDataID: null,
      WeightNetStandard: 0,
      WeightNetTolerancePositive: 0,
      WeightNetToleranceNegative: 0,
      WeightNetApproveUserLogInDataID: null,
      FlagCancel: null,
      HWID: null,
      ExtendedData: null,
      DataHash: null,
      FlagUploadIn: null,
      FlagUploadOut: null,
    };

    reset(initialData);
  }, [info, reset, populateForm]);

  return (
    <Stack sx={{ width: '100%', gap: 2, pt: 2 }}>
      {header}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                const rfidTag = rfidTagDataOptions.find((item) => item.value === data?.value);
                if (rfidTag) {
                  setValue('CarRegister', rfidTag.carRegister ?? '');
                  setValue('CarRegister2', rfidTag.carRegister2 ?? '');
                  setWeightFilters({ CarRegister: rfidTag.carRegister ?? '' });
                }
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
              sx={{ width: '50%' }}
            />
          )}
        />
        <Controller
          control={control}
          name='FlagRegisterStatus'
          render={({ field: { value, onChange, ...rest } }) => (
            <Box sx={{ mb: 1 }}>
              <Typography variant='body2' color='text.secondary'>
                วิธีลงทะเบียน
              </Typography>
              <RadioGroup
                {...rest}
                row
                value={value ?? null}
                onChange={(e) => {
                  onChange(e.target.value);
                  if (e.target.value == 'N') {
                    // เข้าออก
                    setValue('FlagCancel', 'N');
                  }
                }}
              >
                <FormControlLabel
                  value='N'
                  control={<Radio color={errors.FlagRegisterStatus ? 'error' : 'primary'} />}
                  label='เข้าออก'
                />
                <FormControlLabel
                  value='Y'
                  control={<Radio color={errors.FlagRegisterStatus ? 'error' : 'primary'} />}
                  label='ครั้งเดียว'
                />
              </RadioGroup>
              {errors.FlagRegisterStatus && (
                <Typography variant='caption' color='error' sx={{ mt: 0.5, display: 'block' }}>
                  {errors.FlagRegisterStatus.message}
                </Typography>
              )}
            </Box>
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
              value={field.value || ''}
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
              value={field.value || ''}
              size='small'
              label='ทะเบียนรถพวง'
              error={!!errors.CarRegister2}
              helperText={errors.CarRegister2?.message}
              sx={{ width: '50%' }}
              disabled={isCarRegister2Disabled}
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
              setValue('Price', data?.price ?? 0);
              if (data?.productUnitDataID) {
                const productUnitDataID = productUnitData.find((item) => item.value === data.productUnitDataID);
                if (productUnitDataID) {
                  setValue('ProductUnitDataID', data.productUnitDataID);
                  setValue('KgToUnit', productUnitDataID.kgToUnit);
                }
              }
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
              disabled={true}
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
          name='Remark1'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หมายเหตุ 1'
              value={field.value ?? ''}
              error={!!errors.Remark1}
              helperText={errors.Remark1?.message}
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
              disabled={true}
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
          name='Remark2'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หมายเหตุ 2'
              value={field.value ?? ''}
              error={!!errors.Remark2}
              helperText={errors.Remark2?.message}
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
              disabled={true}
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
          name='Remark3'
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              label='หมายเหตุ 3'
              value={field.value ?? ''}
              error={!!errors.Remark3}
              helperText={errors.Remark3?.message}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffffff' } }}>
              <TableCell
                sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)', backgroundColor: 'success.main', color: 'white' }}
                align='center'
              >
                ออก
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0
              </TableCell>
            </TableRow>
            <TableRow sx={{ color: 'text.secondary' }}>
              <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                จำนวนเงิน
              </TableCell>
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0.00
              </TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                น้ำหนักบรรทุก
              </TableCell>
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffffff' } }}>
              <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักเงิน 1
              </TableCell>
              <TableCell align='right'>0.00</TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักน้ำหนัก 1
              </TableCell>
              <TableCell align='right'>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักเงิน 2
              </TableCell>
              <TableCell align='right'>0.00</TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักน้ำหนัก 2
              </TableCell>
              <TableCell align='right'>0</TableCell>
            </TableRow>
            <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#ffffff' } }}>
              <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักเงิน 3
              </TableCell>
              <TableCell align='right'>0.00</TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                หักน้ำหนัก 3
              </TableCell>
              <TableCell align='right'>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderLeft: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                เงินสุทธิ
              </TableCell>
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0.00
              </TableCell>
              <TableCell
                sx={{
                  borderLeft: '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: 'warning.light',
                  color: 'white',
                }}
                align='center'
              >
                น้ำหนักสุทธิ
              </TableCell>
              <TableCell align='right' sx={{ color: 'error.main' }}>
                0
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
});

export { RegisterForm };
