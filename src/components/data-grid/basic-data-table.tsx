import {Stack, Typography} from '@mui/material'
import {merge, noop} from 'lodash-es'
import type {MRT_RowData, MRT_TableOptions} from 'material-react-table'
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table'

import {DataTableContainer} from '@/components'
import {useDefaultDataTableConfig} from '@/lib/react-material-table'

export type BasicDataGridProps<TData extends MRT_RowData> =
  MRT_TableOptions<TData> & {
    title: string
    renderTableContainerHeader?: () => JSX.Element | null
  }

export const BasicDataTable = <T extends MRT_RowData>({
  renderTableContainerHeader = noop as unknown as () => JSX.Element,
  renderTopToolbarCustomActions,
  title,
  ...props
}: BasicDataGridProps<T>) => {
  const defaultDataTableConfig = useDefaultDataTableConfig()
  const config: MRT_TableOptions<T> = merge(
    {
      ...defaultDataTableConfig,
      columns: props.columns,
      data: props.data,
      enableColumnPinning: true,
      enableRowPinning: true,
      enableRowActions: false,
      enableSorting: true,
      initialState: {
        columnPinning: {
          right: [],
          left: ['mrt-row-pin'],
        },
        expanded: true,

        density: 'compact',
      },
      renderTopToolbarCustomActions: (args) => (
        <Stack
          alignItems='center'
          alignSelf='center'
          direction='row'
          height='100%'
          mb={2}
          spacing={1}
        >
          {title.length ? (
            <Typography
              alignSelf='center'
              fontWeight='bold'
              variant='t2'
              noWrap
            >
              {title}
            </Typography>
          ) : null}

          {renderTopToolbarCustomActions?.(args)}
        </Stack>
      ),
    } as MRT_TableOptions<T>,
    props,
  )

  const table = useMaterialReactTable(config)

  return (
    <DataTableContainer>
      <Stack spacing={2}>
        {renderTableContainerHeader()}
        <MaterialReactTable table={table} />
      </Stack>
    </DataTableContainer>
  )
}
