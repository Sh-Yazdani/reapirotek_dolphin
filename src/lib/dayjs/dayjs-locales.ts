import enLocale from 'dayjs/locale/en'

import type {SupportedLanguages} from '@/lib/i18next/i18next-config'

const esLocale = {
  name: 'es', // name String
  weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'), // weekdays Array
  weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'), // short weekdays Array
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'), // min weekdays Array
  weekStart: 1, // Monday as the start of the week
  yearStart: 4, // the week that contains Jan 4th is the first week of the year
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_',
    ), // months Array
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'), // short months Array
  ordinal: (n: unknown) => `${n}º`, // ordinal Function
  formats: {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'DD/MM/YYYY',
    LL: 'D de MMMM de YYYY',
    LLL: 'D de MMMM de YYYY h:mm A',
    LLLL: 'dddd, D de MMMM de YYYY h:mm A',
    l: 'D/M/YYYY',
    ll: 'D de MMM, YYYY',
    lll: 'D de MMM, YYYY h:mm A',
    llll: 'ddd, D de MMM YYYY h:mm A',
  },
  relativeTime: {
    future: 'en %s', // e.g. en 2 horas
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas', // e.g. 2 horas
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
  meridiem: (hour: number) => {
    return hour >= 12 ? 'PM' : 'AM' // AM/PM
  },
}

export const dayjsLocaleMap: Record<SupportedLanguages, ILocale> = {
  en: enLocale,
  es: esLocale,
}
