'use client';

import { useState, useCallback } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { DataTable } from '@/client/components/data-table';
import type { GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';
import { useDriverAPI } from './api';
import type { DriverSchema, CreateDriverSchema } from './schema';
import { DriverForm } from './form';
import { ConfirmModal } from '@/client/components/confirm-modal';

function Driver() {
  const { useGetDrivers, createDriver, updateDriver, deleteDriver } = useDriverAPI();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: driverData, isLoading } = useGetDrivers({}, paginationModel.page + 1, paginationModel.pageSize);

  const [selectedRow, setSelectedRow] = useState<DriverSchema | null>(null);
  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: DriverSchema }>({
    isOpen: false,
  });
  const [deleteInfo, setDeleteInfo] = useState<{ isOpen: boolean; data?: DriverSchema }>({
    isOpen: false,
  });

  const [rowSelect, setRowSelect] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const handleRowSelectionModelChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId = Array.from(selectionModel.ids)[0];
    const selected =
      selectedId !== undefined ? driverData?.result?.data?.find((row) => row.DataID === selectedId) : undefined;
    setSelectedRow(selected || null);
    setRowSelect(selectionModel);
  };

  const handlePaginationModelChange = useCallback((newModel: GridPaginationModel) => {
    setPaginationModel((current) => {
      if (current.page !== newModel.page || current.pageSize !== newModel.pageSize) {
        return newModel;
      }
      return current;
    });
  }, []);

  const handleAdd = () => {
    setFormInfo({ isOpen: true });
  };

  const handleEdit = () => {
    if (selectedRow) {
      setFormInfo({ isOpen: true, data: selectedRow });
    }
  };

  const handleDelete = async () => {
    if (deleteInfo.data?.DataID) {
      await deleteDriver.mutateAsync(String(deleteInfo.data.DataID));
      setDeleteInfo({ isOpen: false });
      setSelectedRow(null);
      setRowSelect({ type: 'include', ids: new Set() });
    }
  };

  const handleFormSubmit = async (data: CreateDriverSchema) => {
    if (formInfo.data) {
      await updateDriver.mutateAsync({
        id: String(formInfo.data.DataID),
        data,
      });
    } else {
      await createDriver.mutateAsync(data);
    }
    setFormInfo({ isOpen: false });
  };

  const columns: GridColDef<DriverSchema>[] = [
    {
      field: 'DriverID',
      headerName: 'รหัส',
      width: 150,
    },
    {
      field: 'DriverName',
      headerName: 'ชื่อ',
      width: 200,
    },
    {
      field: 'Address1',
      headerName: 'ที่อยู่ 1',
      width: 200,
    },
    {
      field: 'Address2',
      headerName: 'ที่อยู่ 2',
      width: 200,
    },
  ];

  return (
    <Stack
      gap={{ xs: 1, sm: 2 }}
      sx={{
        height: '100%',
        p: { xs: 1, sm: 2 },
      }}
    >
      <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700} sx={{ color: '#24237A' }}>
        พนักงานขับรถ
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
          <DataTable
            columns={columns}
            data={driverData?.result?.data ?? []}
            isLoading={isLoading}
            onRowSelect={handleRowSelectionModelChange}
            rowSelect={rowSelect}
            disableRowSelectionOnClick={false}
            paginationMode='server'
            paginationModel={paginationModel}
            rowCount={driverData?.result?.total ?? 0}
            onPaginationModelChange={handlePaginationModelChange}
            actionButtons={
              <Stack direction='row' spacing={2} justifyContent='flex-end' p={2}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleAdd}
                  fullWidth={false}
                  sx={{
                    minWidth: { xs: '100%', sm: 'auto' },
                    order: { xs: 1, sm: 0 },
                  }}
                >
                  เพิ่ม
                </Button>
                <Button
                  variant='contained'
                  color='warning'
                  onClick={handleEdit}
                  disabled={!selectedRow}
                  fullWidth={false}
                  sx={{
                    minWidth: { xs: 'calc(50% - 4px)', sm: 'auto' },
                    order: { xs: 2, sm: 0 },
                  }}
                >
                  แก้ไข
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => selectedRow && setDeleteInfo({ isOpen: true, data: selectedRow })}
                  disabled={!selectedRow}
                  fullWidth={false}
                  sx={{
                    minWidth: { xs: 'calc(50% - 4px)', sm: 'auto' },
                    order: { xs: 3, sm: 0 },
                  }}
                >
                  ลบ
                </Button>
              </Stack>
            }
          />
        </Box>
      </Box>

      <DriverForm
        info={formInfo}
        isLoading={createDriver.isPending || updateDriver.isPending}
        onClose={() => setFormInfo({ isOpen: false })}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isLoading={deleteDriver.isPending}
        isOpen={deleteInfo.isOpen}
        onClose={() => setDeleteInfo({ isOpen: false })}
        onSubmit={handleDelete}
        subTitle="กรุณายืนยันการลบข้อมูลพนักงานขับรถโดยการกด 'ตกลง' หากไม่แน่ใจกด 'ยกเลิก'"
        title='ต้องการลบข้อมูลพนักงานขับรถนี้หรือไม่?'
      />
    </Stack>
  );
}

export { Driver };
