'use client';

import type {
  GridColDef,
  GridInitialState,
  GridPaginationModel,
  GridRowSelectionModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Suspense, useCallback, useEffect, useState } from 'react';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}));

type TableProps<T extends GridValidRowModel> = {
  columns?: GridColDef<T>[];
  data?: T[];
  disableRowSelectionOnClick?: boolean;
  hideFooter?: boolean;
  initialState?: GridInitialState;
  isLoading?: boolean;
  onRowSelect?: (value: GridRowSelectionModel) => void;
  rowSelect?: GridRowSelectionModel;
};

const DEFAULT_PAGE_SIZE = 10;

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        aria-hidden
        fill='none'
        focusable='false'
        viewBox='0 0 452 257'
        width={96}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className='no-rows-primary'
          d='M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z'
        />
        <path
          className='no-rows-primary'
          d='M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z'
        />
        <path
          className='no-rows-primary'
          d='M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z'
        />
        <path
          className='no-rows-secondary'
          d='M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z'
        />
      </svg>

      <Box sx={{ mt: 2 }}>ไม่พบข้อมูล</Box>
    </StyledGridOverlay>
  );
}

function DataTable<T extends GridValidRowModel>(props: TableProps<T>) {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <DataTableComponent {...props} />
    </Suspense>
  );
}

function DataTableComponent<T extends GridValidRowModel>({
  columns = [],
  data = [],
  isLoading = false,
  disableRowSelectionOnClick = true,
  onRowSelect,
  rowSelect,
  hideFooter = false,
  initialState,
}: TableProps<T>) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: hideFooter ? -1 : DEFAULT_PAGE_SIZE,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(
    rowSelect || { type: 'include', ids: new Set() }
  );

  const onPaginationChange = useCallback(({ page, pageSize }: GridPaginationModel) => {
    setPaginationModel({ page, pageSize });
  }, []);

  useEffect(() => {
    if (rowSelect && rowSelect !== rowSelectionModel) {
      setRowSelectionModel(rowSelect);
    }
  }, [rowSelect, rowSelectionModel]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{
        width: '100%',
        height: 400,
        ...(data?.length > 0 ? {} : { minHeight: 320 }),
      }}
    >
      <DataGrid
        columns={columns}
        disableColumnFilter
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        getRowId={(row) => row.DataID}
        hideFooter={hideFooter}
        initialState={initialState}
        loading={isLoading}
        onPaginationModelChange={onPaginationChange}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          onRowSelect?.(newRowSelectionModel);
        }}
        pageSizeOptions={[{ value: -1, label: 'All' }, 5, DEFAULT_PAGE_SIZE, 25, 50, 100]}
        paginationMode='client'
        paginationModel={paginationModel}
        rows={data}
        rowSelectionModel={rowSelectionModel}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sortingMode='client'
        sx={{
          border: 0,
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'auto',
          },
        }}
      />
    </Box>
  );
}

export { DataTable };
