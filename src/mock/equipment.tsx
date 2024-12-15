import {Tooltip, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import {get} from 'lodash-es'
import {createMRTColumnHelper} from 'material-react-table'

import type {Equipment} from '@/lib/data-provider/api/__generated'
import {lineClamp} from '@/lib/material-ui/theme/mixins'

const columnHelper = createMRTColumnHelper<Equipment>()

export const getEquipmentColumns = (t: TFunction<'equipment'>) => [
  columnHelper.accessor('equipmentCode', {
    header: t('tables.columns.equipment-code', {
      defaultValue: 'Equipment Code',
    }),
    size: 40,
  }),
  columnHelper.accessor('name', {
    header: t('tables.columns.name', {defaultValue: 'Name'}),
    size: 40,
  }),
  columnHelper.accessor('equipmentModel', {
    header: t('tables.columns.model', {defaultValue: 'Model'}),
    size: 120,
  }),
  columnHelper.accessor('description', {
    header: t('tables.columns.description', {defaultValue: 'Description'}),
    size: 120,
    Cell(props) {
      const value = get(props.row.original, 'description')!
      return (
        <Tooltip title={value}>
          <Typography sx={lineClamp(2)}>{value}</Typography>
        </Tooltip>
      )
    },
  }),
  columnHelper.accessor('pricePerHour', {
    header: t('tables.columns.price-per-hour', {
      defaultValue: 'Price per hour',
    }),
  }),
  columnHelper.accessor('count', {
    header: t('tables.columns.count', {defaultValue: 'Count'}),
  }),
]
