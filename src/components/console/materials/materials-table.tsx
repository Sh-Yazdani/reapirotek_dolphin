import {get} from 'lodash-es'
import {useTranslation} from 'react-i18next'

import {BasicDataTable} from '@/components'
import {useGetAllMaterialsSuspense} from '@/lib/data-provider/api/__generated'
import {getMaterialsColumns} from '@/mock/materials'

export const MaterialsTable = () => {
  const {data: materials} = useGetAllMaterialsSuspense()
  const {t} = useTranslation('materials')

  return (
    <BasicDataTable
      columns={getMaterialsColumns(t)}
      data={materials}
      getRowId={(row) => get(row, 'id') as unknown as string}
      title={t('tables.title', {defaultValue: 'Materials'})}
      enableSorting
    />
  )
}
