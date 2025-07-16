'use client';

import { useState } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import type { GridPaginationModel, GridColDef } from '@mui/x-data-grid';
import type { WeightSchema, CreateWeightSchema } from './schema';
import { useWeightAPI } from './api';
import { RegisterForm } from './form';
import { DataTable } from '@/client/components/data-table';

function Register() {
  const { useGetRFIDTags, createWeight, updateWeight, deleteWeight } = useWeightAPI();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: weightData, isLoading } = useGetRFIDTags(paginationModel.page + 1, paginationModel.pageSize);

  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightSchema }>({
    isOpen: false,
  });

  const columns: GridColDef<WeightSchema>[] = [
    {
      field: 'DataID',
      headerName: 'รหัส',
      width: 150,
    },
    {
      field: 'RFIDTagDataID',
      headerName: 'รหัสบัตร RFID',
      width: 200,
    },
    {
      field: 'FlagRegisterStatus',
      headerName: 'สถานะการลงทะเบียน',
      width: 200,
    },
    {
      field: 'CarRegister',
      headerName: 'ทะเบียนรถ',
      width: 200,
    },
    {
      field: 'CarRegister2',
      headerName: 'ทะเบียนรถ 2',
      width: 200,
    },
    {
      field: 'WeightTypeDataID',
      headerName: 'รหัสประเภทชั่ง',
      width: 200,
    },
    {
      field: 'WeightTypeDataName',
      headerName: 'ชื่อประเภทชั่ง',
      width: 200,
    },
    {
      field: 'CustomerDataID',
      headerName: 'รหัสคู่ค้า',
      width: 200,
    },
    {
      field: 'CustomerDataName',
      headerName: 'ชื่อคู่ค้า',
      width: 200,
    },
    {
      field: 'ProductDataID',
      headerName: 'รหัสสินค้า',
      width: 200,
    },
    {
      field: 'ProductDataName',
      headerName: 'ชื่อสินค้า',
      width: 200,
    },
    {
      field: 'TransporterDataID',
      headerName: 'รหัสผู้ขนส่ง',
      width: 200,
    },
    {
      field: 'TransporterDataName',
      headerName: 'ชื่อผู้ขนส่ง',
      width: 200,
    },
    {
      field: 'DriverDataID',
      headerName: 'รหัสพนักงานขับรถ',
      width: 200,
    },

    {
      field: 'DriverDataName',
      headerName: 'ชื่อพนักงานขับรถ',
      width: 200,
    },
  ];

  const handleAdd = () => {
    setFormInfo({ isOpen: true });
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
          <RegisterForm
            info={formInfo}
            isLoading={createWeight.isPending || updateWeight.isPending}
            onClose={() => setFormInfo({ isOpen: false })}
            onSubmit={handleFormSubmit}
          />
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
              เพิ่ม
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => setFormInfo({ isOpen: false, data: undefined })}
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
      </Box>
    </Stack>
  );
}

export { Register };
