import {get} from 'lodash-es'
import type {MRT_TableOptions} from 'material-react-table'
import {MRT_Localization_EN} from 'material-react-table/locales/en'
import {MRT_Localization_ES} from 'material-react-table/locales/es'
import {useTranslation} from 'react-i18next'

import {dataGridIcons} from '@/components/data-grid/icons'

const MRTLocalizationMap = {
  en: MRT_Localization_EN,
  es: MRT_Localization_ES,
}

export const useDefaultDataTableConfig = (): Omit<
  MRT_TableOptions<Record<string, unknown>>,
  'columns' | 'data'
> => {
  const {i18n} = useTranslation()

  const localization = get(MRTLocalizationMap, i18n.language)
  return {
    icons: dataGridIcons,
    enableStickyHeader: true,
    muiTablePaperProps: {
      elevation: 0,
      sx: {borderRadius: 5},
    },
    muiTableContainerProps: {sx: {maxHeight: '400px'}},

    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.common.white,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    localization,
  }
}
