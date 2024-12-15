import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDayShowers,
  WiDaySunny,
  WiFog,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltShowers,
  WiNightClear,
  WiNightFog,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi'

// eslint-disable-next-line complexity
export const getWeatherIcon = (weatherIcon: string) => {
  switch (weatherIcon) {
    case '01d':
      return WiDaySunny
    case '01n':
      return WiNightClear
    case '02d':
      return WiDayCloudy
    case '02n':
      return WiNightAltCloudy
    case '03d':
    case '03n':
      return WiCloud
    case '04d':
    case '04n':
      return WiCloudy
    case '09d':
      return WiDayShowers
    case '09n':
      return WiNightAltShowers
    case '10d':
      return WiDayRain
    case '10n':
      return WiNightAltRain
    case '11d':
    case '11n':
      return WiThunderstorm
    case '13d':
    case '13n':
      return WiSnow
    case '50d':
      return WiFog
    case '50n':
      return WiNightFog
    default:
      return null
  }
}
