'use client';

import { useState } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { DataTable } from '@/client/components/data-table';
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useWeightTypeAPI } from './api';
import type { WeightTypeSchema, CreateWeightTypeSchema } from './schema';
import { WeightTypeForm } from './form';
import { ConfirmModal } from '@/client/components/confirm-modal';

function WeightType() {
  const { getWeightTypes, createWeightType, updateWeightType, deleteWeightType } = useWeightTypeAPI();
  const { data: weightTypeData, isLoading } = getWeightTypes;

  const [selectedRow, setSelectedRow] = useState<WeightTypeSchema | null>(null);
  const [formInfo, setFormInfo] = useState<{ isOpen: boolean; data?: WeightTypeSchema }>({
    isOpen: false,
  });
  const [deleteInfo, setDeleteInfo] = useState<{ isOpen: boolean; data?: WeightTypeSchema }>({
    isOpen: false,
  });

  const [rowSelect, setRowSelect] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

  const handleRowSelectionModelChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId = Array.from(selectionModel.ids)[0];
    const selected =
      selectedId !== undefined ? weightTypeData?.data.find((row) => row.DataID === selectedId) : undefined;
    setSelectedRow(selected || null);
    setRowSelect(selectionModel);
  };

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
      await deleteWeightType.mutateAsync(String(deleteInfo.data.DataID));
      setDeleteInfo({ isOpen: false });
      setSelectedRow(null);
      setRowSelect({ type: 'include', ids: new Set() });
    }
  };

  const handleFormSubmit = async (data: CreateWeightTypeSchema) => {
    if (formInfo.data) {
      await updateWeightType.mutateAsync({
        id: String(formInfo.data.DataID),
        data,
      });
    } else {
      await createWeightType.mutateAsync(data);
    }
    setFormInfo({ isOpen: false });
  };

  const columns: GridColDef<WeightTypeSchema>[] = [
    {
      field: 'WeightTypeID',
      headerName: 'รหัส',
      width: 150,
    },
    {
      field: 'WeightTypeName',
      headerName: 'ชื่อ',
      width: 200,
    },
  ];

  return (
    <Stack gap={2}>
      <Typography fontSize={24} fontWeight={700} sx={{ color: '#24237A' }}>
        ประเภทชั่ง
      </Typography>

      <Box sx={{ width: '100%', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #0000001f', p: 2 }}>
        <DataTable
          columns={columns}
          data={weightTypeData?.data}
          isLoading={isLoading}
          onRowSelect={handleRowSelectionModelChange}
          rowSelect={rowSelect}
          disableRowSelectionOnClick={false}
        />
        <Stack direction='row' spacing={2} my={2}>
          <Button variant='contained' color='primary' onClick={handleAdd}>
            เพิ่ม
          </Button>
          <Button variant='contained' color='warning' onClick={handleEdit} disabled={!selectedRow}>
            แก้ไข
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => selectedRow && setDeleteInfo({ isOpen: true, data: selectedRow })}
            disabled={!selectedRow}
          >
            ลบ
          </Button>
        </Stack>
      </Box>

      <WeightTypeForm
        info={formInfo}
        isLoading={createWeightType.isPending || updateWeightType.isPending}
        onClose={() => setFormInfo({ isOpen: false })}
        onSubmit={handleFormSubmit}
      />

      <ConfirmModal
        isLoading={deleteWeightType.isPending}
        isOpen={deleteInfo.isOpen}
        onClose={() => setDeleteInfo({ isOpen: false })}
        onSubmit={handleDelete}
        subTitle="กรุณายืนยันการลบข้อมูลประเภทชั่งนี้โดยการกด 'ตกลง' หากไม่แน่ใจกด 'ยกเลิก'"
        title='ต้องการลบข้อมูลประเภทชั่งนี้หรือไม่?'
      />
    </Stack>
  );
}

export { WeightType };
