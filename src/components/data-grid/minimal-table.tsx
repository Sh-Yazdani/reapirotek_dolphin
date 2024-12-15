import {styled} from '@mui/material'
import type {TableProps} from '@mui/material/Table'
import OriginalTable from '@mui/material/Table'
import OriginalTableCell from '@mui/material/TableCell'

export const TableHeadCell = styled(OriginalTableCell)(({theme}) => ({
  background:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.grey[700],
  color:
    theme.palette.mode === 'light'
      ? theme.palette.common.white
      : theme.palette.common.black,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  border: 'none !important',
  whiteSpace: 'nowrap',
}))

export const TableCell = styled(OriginalTableCell)(({theme}) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  whiteSpace: 'nowrap',
}))

export const TableSubCell = styled(OriginalTableCell)(({theme}) => ({
  background:
    theme.palette.mode === 'light' ? theme.palette.grey[100] : undefined,
  // padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const Table = styled(OriginalTable)(({theme}) => ({
  '&th, td': {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.neutrals?.line,
  },
}))
interface TableCellType {
  text: string
  colSpan: number
  align?: TableProps['align']
  isHeader?: boolean
  isSubHeader?: boolean
}

export interface MinimalTableData {
  title: string
  header: TableCellType[]
  rows: {cells: TableCellType[]}[]
}
