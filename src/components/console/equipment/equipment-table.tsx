import {get} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import {useGetAllEquipmentSuspense} from '@/lib/data-provider/api/__generated'
import {getEquipmentColumns} from '@/mock/equipment'

export const EquipmentTable = () => {
  const {data: equipment} = useGetAllEquipmentSuspense()
  const {t} = useTranslation('equipment')

  return (
    <BasicDataTable
      columns={getEquipmentColumns(t)}
      data={equipment}
      getRowId={(row) => get(row, 'id') as unknown as string}
      title='Equipment'
      enableSorting
    />
  )
}
