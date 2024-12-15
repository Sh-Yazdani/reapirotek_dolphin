/* eslint-disable */
import {
  MRT_RowData,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'

import {merge} from 'lodash-es'
import {DataTableContainer} from '@/components'
import {useDefaultDataTableConfig} from '@/lib/react-material-table'

export type OperationsDataTableProps<TData extends MRT_RowData> =
  MRT_TableOptions<TData>

export const OperationsDataTable = <T extends MRT_RowData>(
  props: OperationsDataTableProps<T>,
) => {
  const defaultDataTableConfig = useDefaultDataTableConfig()

  const config = merge(
    {
      ...defaultDataTableConfig,
      data: props.data,
      columns: props.columns,
      createDisplayMode: 'row', // ('modal', and 'custom' are also available)
      editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
      enableEditing: true,
      getRowId: (row) => row.id,
      mrtTheme: (theme) => ({
        baseBackgroundColor: theme.palette.common.white,
        draggingBorderColor: theme.palette.secondary.main,
      }),
      initialState: {
        columnPinning: {left: ['mrt-row-actions']},
        density: 'compact',
      },
      enableColumnPinning: true,
    } as OperationsDataTableProps<T>,
    props,
  )

  const table = useMaterialReactTable(config)

  return (
    <DataTableContainer>
      <MaterialReactTable table={table} />
    </DataTableContainer>
  )
}
