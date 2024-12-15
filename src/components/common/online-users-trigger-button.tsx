import {Button, styled} from '@mui/material'
import {useTranslation} from 'react-i18next'

import {useOnlineUsersSidebarStore} from '@/store/online-users-sidebar'

const StyledOnlineUsersTriggerButton = styled(Button)(({theme}) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '14px',
  padding: theme.spacing(0.5, 1),
  [theme.breakpoints.down('md')]: {
    fontSize: '13px',
    padding: theme.spacing(0.3, 0.5),
  },
}))

export const OnlineUsersTriggerButton = () => {
  const open = useOnlineUsersSidebarStore((s) => s.open)
  const {t} = useTranslation('employees')
  return (
    <StyledOnlineUsersTriggerButton
      className='shrink-0'
      size='small'
      variant='contained'
      onClick={open}
    >
      {t('online-employees-sidebar.cta', {
        defaultValue: 'Online Users',
      })}
    </StyledOnlineUsersTriggerButton>
  )
}
