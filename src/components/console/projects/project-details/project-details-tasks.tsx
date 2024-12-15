import {Stack, Typography} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {useTranslation} from 'react-i18next'

import {BackToLink} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {lazyImport} from '@/utils/lazyImport'

const Tasks = lazyImport(() =>
  import('@/components/console/tasks/tasks').then((m) => ({
    default: m.Tasks,
  })),
)

export const ProjectDetailsTasks = () => {
  const {isDesktop} = useBreakpointValues()
  const {t} = useTranslation('projects')
  return (
    <Stack /* height='100%' overflow='hidden' */ height='100%' spacing={3}>
      {isDesktop ? (
        <Stack direction='row' justifyContent='space-between' pt={1}>
          <Typography fontWeight='medium' variant='caption'>
            {t('tasks.title', {defaultValue: 'Project Tasks'})}
          </Typography>

          <Link to='/console/projects'>
            <BackToLink
              caption={t('tasks.back', {defaultValue: 'Back to projects list'})}
              fontWeight='normal'
              underline={false}
              variant='caption'
            />
          </Link>
        </Stack>
      ) : null}
      <Tasks type='PROJECT-TASKS' />
    </Stack>
  )
}
