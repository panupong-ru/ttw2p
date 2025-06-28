'use client';

import type {
  GridColDef,
  GridInitialState,
  GridPaginationModel,
  GridRowSelectionModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  actionButtons?: React.ReactNode;
  paginationMode?: 'client' | 'server';
  paginationModel?: GridPaginationModel;
  rowCount?: number;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
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

function DataTable<T extends GridValidRowModel>({
  columns = [],
  data = [],
  isLoading = false,
  disableRowSelectionOnClick = true,
  onRowSelect,
  rowSelect,
  hideFooter = false,
  initialState,
  actionButtons,
  paginationMode = 'client',
  paginationModel,
  rowCount,
  onPaginationModelChange,
}: TableProps<T>) {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(
    rowSelect || { type: 'include', ids: new Set() }
  );

  useEffect(() => {
    if (rowSelect && rowSelect !== rowSelectionModel) {
      setRowSelectionModel(rowSelect);
    }
  }, [rowSelect, rowSelectionModel]);

  function CustomPaginationWithPageSize() {
    // Use parent props instead of DataGrid selectors
    const currentPaginationModel =
      paginationMode === 'server'
        ? paginationModel
        : {
            page: 0,
            pageSize: hideFooter ? -1 : DEFAULT_PAGE_SIZE,
          };
    const page = currentPaginationModel?.page ?? 0;
    const pageSize = currentPaginationModel?.pageSize ?? DEFAULT_PAGE_SIZE;
    const totalRows = rowCount ?? data.length;
    const pageCount = Math.ceil(totalRows / pageSize);

    // Use stable state management
    const [inputValue, setInputValue] = useState(() => String(page + 1));
    const [isUserEditing, setIsUserEditing] = useState(false);

    // Update input value when page changes externally (only if user is not editing)
    if (!isUserEditing && String(page + 1) !== inputValue) {
      setInputValue(String(page + 1));
    }

    const handlePageChange = (newPageInput: string) => {
      const newPage = parseInt(newPageInput, 10);
      const newModel = { page: 0, pageSize };

      if (newPage > 0 && newPage <= pageCount) {
        newModel.page = newPage - 1;
        setInputValue(String(newPage));
      } else if (newPage > pageCount) {
        newModel.page = pageCount - 1;
        setInputValue(String(pageCount));
      } else if (newPage < 1) {
        newModel.page = 0;
        setInputValue('1');
      }

      // Call parent pagination handler
      onPaginationModelChange?.(newModel);
      setIsUserEditing(false);
    };

    const handleIconButtonClick = (newPage: number) => {
      const newModel = { page: newPage, pageSize };
      onPaginationModelChange?.(newModel);
      setInputValue(String(newPage + 1));
      setIsUserEditing(false);
    };

    const handlePageSizeChange = (newPageSize: number) => {
      const newModel = { page: 0, pageSize: newPageSize };
      onPaginationModelChange?.(newModel);
      setInputValue('1');
      setIsUserEditing(false);
    };

    const pageSizeOptions = [5, 10, 25, 50, 100];

    return (
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'center', sm: 'center' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={2}
        sx={{ width: '100%', py: 1 }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 'auto' },
            mb: { xs: 1, sm: 0 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {actionButtons}
        </Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems='center'
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 0, flexWrap: 'wrap' }}
        >
          <TablePagination
            component='div'
            count={totalRows}
            page={page}
            onPageChange={() => {}}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => handlePageSizeChange(Number(e.target.value))}
            rowsPerPageOptions={pageSizeOptions}
            labelRowsPerPage='จำนวนแถวต่อหน้า'
            ActionsComponent={() => <></>}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              mb: { xs: 1, sm: 0 },
              '.MuiTablePagination-toolbar': { p: 0, justifyContent: { xs: 'center', sm: 'flex-start' } },
            }}
          />
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' },
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              alignSelf: 'center',
              minWidth: 0,
              gap: 1,
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => handleIconButtonClick(0)} disabled={page === 0} size='small'>
              <FirstPageIcon />
            </IconButton>
            <IconButton onClick={() => handleIconButtonClick(page - 1)} disabled={page === 0} size='small'>
              <ArrowBackIosNewIcon fontSize='small' />
            </IconButton>
            <TextField
              type='number'
              size='small'
              value={inputValue}
              onChange={(e) => {
                setIsUserEditing(true);
                setInputValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePageChange(inputValue);
                  (e.target as HTMLInputElement).blur();
                }
              }}
              onFocus={() => {
                setIsUserEditing(true);
              }}
              onBlur={() => {
                const currentValue = parseInt(inputValue, 10);
                if (isNaN(currentValue) || currentValue < 1 || currentValue > pageCount) {
                  setInputValue(String(page + 1));
                }
                setIsUserEditing(false);
              }}
              sx={{
                input: {
                  textAlign: 'center',
                  width: '50px',
                },
              }}
              slotProps={{
                input: {
                  inputProps: {
                    min: 1,
                    max: pageCount,
                  },
                },
              }}
            />
            <Box component='span' sx={{ mx: 0.5 }}>
              / {pageCount}
            </Box>
            <IconButton onClick={() => handleIconButtonClick(page + 1)} disabled={page === pageCount - 1} size='small'>
              <ArrowForwardIosIcon fontSize='small' />
            </IconButton>
            <IconButton
              onClick={() => handleIconButtonClick(pageCount - 1)}
              disabled={page === pageCount - 1}
              size='small'
            >
              <LastPageIcon />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row.DataID}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          onRowSelect?.(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        hideFooter={hideFooter}
        initialState={initialState}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          footer: actionButtons ? CustomPaginationWithPageSize : undefined,
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
          },
          '& .MuiDataGrid-virtualScroller': {
            marginTop: '10px !important',
          },
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
}

export { DataTable };
