import {useTranslation} from 'react-i18next'

import {ExportDataTable} from '@/components'
import {useGetAllMaterialsSuspense} from '@/lib/data-provider/api/__generated'
import {getMaterialsColumns} from '@/mock/materials'

export const MaterialsExportTable = () => {
  const {data: materials} = useGetAllMaterialsSuspense()
  const {t} = useTranslation('materials')
  return (
    <ExportDataTable
      columns={getMaterialsColumns(t)}
      data={materials}
      exportedFileNameSuffix='materials'
    />
  )
}
