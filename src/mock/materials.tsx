import {Tooltip, Typography} from '@mui/material'
import type {TFunction} from 'i18next'
import {get} from 'lodash-es'
import {createMRTColumnHelper} from 'material-react-table'

import type {Material, MaterialUnit} from '@/lib/data-provider/api/__generated'
import {lineClamp} from '@/lib/material-ui/theme/mixins'

const columnHelper = createMRTColumnHelper<Material>()

export const getMaterialUnitOptions = (
  t: TFunction<'materials'>,
): {
  label: string
  value: MaterialUnit
}[] => [
  {
    label: t('material-units.gr', {defaultValue: 'GR'}),
    value: 'gr',
  },
  {
    label: t('material-units.kg', {defaultValue: 'KG'}),
    value: 'Kg',
  },
  {
    label: t('material-units.ton', {defaultValue: 'TON'}),
    value: 'Tone',
  },
]

export const getMaterialsColumns = (t: TFunction<'materials'>) => [
  /* @ts-ignore swagger issues */
  columnHelper.accessor('materialCode', {
    header: t('tables.columns.material-code', {
      defaultValue: 'Material Code',
    }),
    size: 40,
  }),

  columnHelper.accessor('name', {
    header: t('tables.columns.name', {defaultValue: 'Name'}),
    size: 40,
  }),

  columnHelper.accessor('description', {
    header: t('tables.columns.description', {
      defaultValue: 'Description',
    }),
    size: 120,

    Cell(props) {
      const value = get(props.row.original, 'description')

      return (
        <Tooltip title={value}>
          <Typography sx={lineClamp(2)}>{value}</Typography>
        </Tooltip>
      )
    },
  }),
  columnHelper.accessor('pricePerUnit', {
    header: t('tables.columns.price-per-unit', {
      defaultValue: 'Price per unit',
    }),
  }),
  columnHelper.accessor('value', {
    header: t('tables.columns.value', {defaultValue: 'Value'}),
  }),
  columnHelper.accessor('unit', {
    header: t('tables.columns.unit', {defaultValue: 'Unit'}),
  }),
]
