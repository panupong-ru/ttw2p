'use client';

import { useState, useRef } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import type { GridPaginationModel, GridColDef } from '@mui/x-data-grid';
import type { WeightSchema, CreateWeightSchema } from '@/client/modules/master-data/weight/schema';
import { useWeightAPI } from '@/client/modules/master-data/weight/api';
import { RegisterForm, type RegisterFormRef } from './form';
import { DataTable } from '@/client/components/data-table';

function Register() {
  const { useGetWeights, createWeight, updateWeight } = useWeightAPI();
  const registerFormRef = useRef<RegisterFormRef>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: weightData, isLoading } = useGetWeights({}, paginationModel.page + 1, paginationModel.pageSize);

  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightSchema }>({
    isOpen: false,
  });

  const columns: GridColDef<WeightSchema>[] = [
    {
      field: 'CarRegister',
      headerName: 'Truck Id',
      width: 150,
    },
    {
      field: 'RegisterTimeIn',
      headerName: 'Time In',
      width: 200,
    },
    {
      field: 'CustomerDataID',
      headerName: 'Customer Id',
      width: 200,
    },
    {
      field: 'CustomerDataName',
      headerName: 'Customer Name',
      width: 200,
    },
    {
      field: 'ProductDataID',
      headerName: 'Product Id',
      width: 200,
    },
    {
      field: 'ProductDataName',
      headerName: 'Product Name',
      width: 200,
    },
    {
      field: 'WeightTypeDataID',
      headerName: 'Weight Type Id',
      width: 200,
    },
    {
      field: 'WeightTypeDataName',
      headerName: 'Weight Type Name',
      width: 200,
    },
    {
      field: 'TransporterDataID',
      headerName: 'Transporter Id',
      width: 200,
    },
    {
      field: 'TransporterDataName',
      headerName: 'Transporter Name',
      width: 200,
    },
    {
      field: 'DriverDataID',
      headerName: 'Driver Id',
      width: 200,
    },
    {
      field: 'DriverDataName',
      headerName: 'Driver Name',
      width: 200,
    },
    {
      field: 'Remark1',
      headerName: 'Remark 1',
      width: 200,
    },
    {
      field: 'Remark2',
      headerName: 'Remark 2',
      width: 200,
    },

    {
      field: 'Remark3',
      headerName: 'Remark 3',
      width: 200,
    },
  ];

  const handleAdd = () => {
    registerFormRef.current?.submitForm();
  };

  const handleCancel = () => {
    registerFormRef.current?.resetForm();
    setFormInfo({ isOpen: false, data: undefined });
  };

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

  return (
    <Stack
      gap={{ xs: 1, sm: 2 }}
      sx={{
        height: '100%',
        p: { xs: 1, sm: 2 },
      }}
    >
      <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#24237A' }}>
        Register
      </Typography>

      <Box
        sx={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #0000001f',
          p: { xs: 1, sm: 2 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >
          <RegisterForm info={formInfo} onSubmit={handleFormSubmit} ref={registerFormRef} />
        </Box>
        <Stack direction='row' spacing={2} justifyContent='flex-end' py={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleAdd}
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
            onClick={handleCancel}
            fullWidth={false}
            sx={{
              minWidth: { xs: '100%', sm: 'auto' },
              order: { xs: 1, sm: 0 },
            }}
          >
            ยกเลิก
          </Button>
        </Stack>
        <DataTable
          height='20%'
          columns={columns}
          data={weightData?.result?.data ?? []}
          isLoading={isLoading}
          disableRowSelectionOnClick={false}
          paginationMode='server'
          paginationModel={paginationModel}
          rowCount={weightData?.result?.total ?? 0}
        />
      </Box>
    </Stack>
  );
}

export { Register };
