'use client';

import { useState, useCallback } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { DataTable } from '@/client/components/data-table';
import type { GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';
import type { WeightSchema } from './schema';
import { ConfirmModal } from '@/client/components/confirm-modal';
import { useRFIDTagAPI } from './api';
import { Form } from './form';

function Table() {
  const { useGetRFIDTags, createRFIDTag, updateRFIDTag, deleteRFIDTag } = useRFIDTagAPI();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: rfidTagData, isLoading } = useGetRFIDTags(paginationModel.page + 1, paginationModel.pageSize);

  const [selectedRow, setSelectedRow] = useState<WeightSchema | null>(null);
  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightSchema }>({
    isOpen: false,
  });
  const [deleteInfo, setDeleteInfo] = useState<{ isOpen: boolean; data?: WeightSchema }>({
    isOpen: false,
  });

  const [rowSelect, setRowSelect] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const handleRowSelectionModelChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId = Array.from(selectionModel.ids)[0];
    const selected =
      selectedId !== undefined ? rfidTagData?.result?.data?.find((row) => row.DataID === selectedId) : undefined;
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

  const handleEdit = () => {
    if (selectedRow) {
      setFormInfo({ isOpen: true, data: selectedRow });
    }
  };

  const handleDelete = async () => {
    if (deleteInfo.data?.DataID) {
      await deleteRFIDTag.mutateAsync(String(deleteInfo.data.DataID));
      setDeleteInfo({ isOpen: false });
      setSelectedRow(null);
      setRowSelect({ type: 'include', ids: new Set() });
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (formInfo.data) {
      await updateRFIDTag.mutateAsync({
        id: String(formInfo.data.DataID),
        data,
      });
    } else {
      await createRFIDTag.mutateAsync(data);
    }
    setFormInfo({ isOpen: false });
  };

  const columns: GridColDef<any>[] = [
    {
      field: 'RFIDTagID',
      headerName: 'รหัส',
      width: 150,
    },
    {
      field: 'RFIDTagSerialNo',
      headerName: 'Serial No.',
      width: 200,
    },
    {
      field: 'CarRegister',
      headerName: 'ทะเบียนรถ',
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

  return (
    <Stack
      gap={{ xs: 1, sm: 2 }}
      sx={{
        height: '100%',
        p: { xs: 1, sm: 2 },
      }}
    >
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
            data={rfidTagData?.result?.data ?? []}
            isLoading={isLoading}
            onRowSelect={handleRowSelectionModelChange}
            rowSelect={rowSelect}
            disableRowSelectionOnClick={false}
            paginationMode='server'
            paginationModel={paginationModel}
            rowCount={rfidTagData?.result?.total ?? 0}
            onPaginationModelChange={handlePaginationModelChange}
            actionButtons={
              <Stack direction='row' spacing={2} justifyContent='flex-end' p={2}>
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

      <Form
        info={formInfo}
        isLoading={createRFIDTag.isPending || updateRFIDTag.isPending}
        onClose={() => setFormInfo({ isOpen: false })}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isLoading={deleteRFIDTag.isPending}
        isOpen={deleteInfo.isOpen}
        onClose={() => setDeleteInfo({ isOpen: false })}
        onSubmit={handleDelete}
        subTitle="กรุณายืนยันการลบข้อมูลบัตร RFID นี้โดยการกด 'ตกลง' หากไม่แน่ใจกด 'ยกเลิก'"
        title='ต้องการลบข้อมูลบัตร RFID นี้หรือไม่?'
      />
    </Stack>
  );
}

export { Table };
