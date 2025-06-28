'use client';

import { useState, useCallback } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { DataTable } from '@/client/components/data-table';
import type { GridColDef, GridRowSelectionModel, GridPaginationModel } from '@mui/x-data-grid';
import { useWeightUnitAPI } from './api';
import type { WeightUnitSchema, CreateWeightUnitSchema } from './schema';
import { WeightUnitForm } from './form';
import { ConfirmModal } from '@/client/components/confirm-modal';

function WeightUnit() {
  const { useGetWeightUnits, createWeightUnit, updateWeightUnit, deleteWeightUnit } = useWeightUnitAPI();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data: weightUnitData, isLoading } = useGetWeightUnits(paginationModel.page + 1, paginationModel.pageSize);

  const [selectedRow, setSelectedRow] = useState<WeightUnitSchema | null>(null);
  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightUnitSchema }>({
    isOpen: false,
  });
  const [deleteInfo, setDeleteInfo] = useState<{ isOpen: boolean; data?: WeightUnitSchema }>({
    isOpen: false,
  });

  const [rowSelect, setRowSelect] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const handleRowSelectionModelChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId = Array.from(selectionModel.ids)[0];
    const selected =
      selectedId !== undefined ? weightUnitData?.result?.data?.find((row) => row.DataID === selectedId) : undefined;
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
      await deleteWeightUnit.mutateAsync(String(deleteInfo.data.DataID));
      setDeleteInfo({ isOpen: false });
      setSelectedRow(null);
      setRowSelect({ type: 'include', ids: new Set() });
    }
  };

  const handleFormSubmit = async (data: CreateWeightUnitSchema) => {
    if (formInfo.data) {
      await updateWeightUnit.mutateAsync({
        id: String(formInfo.data.DataID),
        data,
      });
    } else {
      await createWeightUnit.mutateAsync(data);
    }
    setFormInfo({ isOpen: false });
  };

  const columns: GridColDef<WeightUnitSchema>[] = [
    {
      field: 'WeightUnitID',
      headerName: 'ชื่อย่อ',
      width: 150,
    },
    {
      field: 'WeightUnitName',
      headerName: 'ชื่อเต็ม',
      width: 200,
    },
    {
      field: 'KgToUnit',
      headerName: 'น้ำหนัก/หน่วย',
      width: 150,
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
        หน่วยราคา
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
            data={weightUnitData?.result?.data ?? []}
            isLoading={isLoading}
            onRowSelect={handleRowSelectionModelChange}
            rowSelect={rowSelect}
            disableRowSelectionOnClick={false}
            paginationMode='server'
            paginationModel={paginationModel}
            rowCount={weightUnitData?.result?.total ?? 0}
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

      <WeightUnitForm
        info={formInfo}
        isLoading={createWeightUnit.isPending || updateWeightUnit.isPending}
        onClose={() => setFormInfo({ isOpen: false })}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isLoading={deleteWeightUnit.isPending}
        isOpen={deleteInfo.isOpen}
        onClose={() => setDeleteInfo({ isOpen: false })}
        onSubmit={handleDelete}
        subTitle="กรุณายืนยันการลบข้อมูลหน่วยราคาโดยการกด 'ตกลง' หากไม่แน่ใจกด 'ยกเลิก'"
        title='ต้องการลบข้อมูลหน่วยราคานี้หรือไม่?'
      />
    </Stack>
  );
}

export { WeightUnit };
