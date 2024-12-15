import {Button, Stack} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {jsPDF} from 'jspdf' // or use your library of choice here
import autoTable from 'jspdf-autotable'
import type {PropertyPath} from 'lodash-es'
import {
  find,
  get,
  has,
  head,
  isUndefined,
  merge,
  noop,
  omit,
  set,
} from 'lodash-es'
import type {
  MRT_ColumnDef,
  MRT_ColumnOrderState,
  MRT_Row,
  MRT_RowData,
  MRT_TableOptions,
  MRT_VisibilityState,
} from 'material-react-table'
import {MaterialReactTable, useMaterialReactTable} from 'material-react-table'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDeepCompareMemo} from 'use-deep-compare'

import {DataTableContainer} from '@/components'
import {useMenu} from '@/hooks'
import {useDefaultDataTableConfig} from '@/lib/react-material-table'
import {generatePDFName} from '@/utils/pdf'

export type ExportDataTableProps<TData extends MRT_RowData> =
  MRT_TableOptions<TData> & {
    renderTableContainerHeader?: () => JSX.Element | null
    exportedFileNameSuffix: string
  }

// eslint-disable-next-line max-lines-per-function
export const ExportDataTable = <T extends MRT_RowData>({
  exportedFileNameSuffix,
  renderTableContainerHeader = noop as unknown as () => JSX.Element,
  renderTopToolbarCustomActions,
  ...props
}: ExportDataTableProps<T>) => {
  const {t} = useTranslation('common')

  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>([])
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    (props.initialState?.columnVisibility ||
      {}) as unknown as MRT_VisibilityState,
  )
  const defaultDataTableConfig = useDefaultDataTableConfig()

  const handleExportRows = (rows: MRT_Row<T>[]) => {
    const doc = new jsPDF()
    const tableData = rows
      /* Apply column visibliity */
      .map((row) => omit(row.original, Object.keys(columnVisibility)))

      .map((entry) => {
        const sortedEntry = {} as MRT_Row<T>['original']
        columnOrder.forEach((key) => {
          if (get(entry, key)) {
            if (key.includes('.')) {
              return set(sortedEntry, head(key.split('.'))!, get(entry, key))
            }
            set(sortedEntry, key, get(entry, key))
          }
        })

        return sortedEntry
      })
      .map((row) => Object.values(row))

    /* Apply column order */
    const orderedColumns = columnOrder
      .map((col) => find(props.columns, {accessorKey: col}))
      .filter(Boolean) as (
      | MRT_ColumnDef<T, number>
      | MRT_ColumnDef<T, string>
    )[]
    const tableHeaders = orderedColumns
      .filter(
        (column) => !has(columnVisibility, column.accessorKey as PropertyPath),
      )
      .filter((v) => isUndefined(get(columnVisibility, v.id as string)))
      .map((v) => v.header)

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    })

    doc.save(generatePDFName(exportedFileNameSuffix))
  }

  const exportMenu = useMenu()
  const config = useDeepCompareMemo(
    () =>
      merge(
        {
          ...defaultDataTableConfig,
          enableRowSelection: true,
          paginationDisplayMode: 'pages',
          positionToolbarAlertBanner: 'bottom',
          enableColumnOrdering: true,
          enableFilters: true,
          onColumnOrderChange: setColumnOrder,
          onColumnVisibilityChange: setColumnVisibility,
          state: {
            columnOrder,
            columnVisibility,
          },
          initialState: {
            density: 'compact',
          },
          renderTopToolbarCustomActions: (args) => {
            const {table} = args
            return (
              <Stack alignItems='center' direction='row' spacing={2}>
                <Button variant='contained' onClick={exportMenu.handleClick}>
                  {t('export', {defaultValue: 'Export'})}
                </Button>
                <Menu
                  anchorEl={exportMenu.anchorEl}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  open={exportMenu.open}
                  onClose={exportMenu.handleClose}
                >
                  <MenuItem
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    onClick={() => {
                      handleExportRows(table.getPrePaginationRowModel().rows)
                      exportMenu.handleClose()
                    }}
                  >
                    Export all rows
                  </MenuItem>

                  <MenuItem
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() => {
                      handleExportRows(table.getRowModel().rows)
                      exportMenu.handleClose()
                    }}
                  >
                    Export page rows
                  </MenuItem>

                  <MenuItem
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    onClick={() => {
                      handleExportRows(table.getSelectedRowModel().rows)
                      exportMenu.handleClose()
                    }}
                  >
                    Export Selected Rows
                  </MenuItem>
                </Menu>
                {renderTopToolbarCustomActions?.(args)}
              </Stack>
            )
          },
        } as ExportDataTableProps<T>,
        props,
      ),
    [
      props.data,
      props.columns,
      columnOrder,
      columnVisibility,
      exportMenu,
      renderTopToolbarCustomActions,
      defaultDataTableConfig.localization,
    ],
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
