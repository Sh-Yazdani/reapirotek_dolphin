import {useTranslation} from 'react-i18next'

import {ExportDataTable} from '@/components'
import {useGetAllEquipmentSuspense} from '@/lib/data-provider/api/__generated'
import {getEquipmentColumns} from '@/mock/equipment'

export const EquipmentExportTable = () => {
  const {data: equipment} = useGetAllEquipmentSuspense()
  const {t} = useTranslation('equipment')
  return (
    <ExportDataTable
      columns={getEquipmentColumns(t)}
      data={equipment}
      exportedFileNameSuffix='equipment'
    />
  )
}
