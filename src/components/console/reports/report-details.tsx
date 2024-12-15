import {Box, Card, Divider, Stack, Typography} from '@mui/material'
import {Outlet} from '@tanstack/react-router'

import {CardWithTitle} from '@/components'

// eslint-disable-next-line max-lines-per-function
const ReportDetailsInfoCard = () => {
  return (
    <Card sx={{bgcolor: 'background.default', flex: 1}}>
      <Stack gap={3}>
        <Stack
          direction='column'
          gap={{xs: 2, md: 2}}
          justifyContent='space-between'
        >
          <Stack direction='column' spacing={{xs: 2, md: 3}}>
            <Typography fontWeight='bold' variant='caption'>
              Report title:
            </Typography>

            <Typography
              fontSize={{xs: 20, md: 16}}
              fontWeight='bold'
              variant='t2'
            >
              Conatus delectatio
            </Typography>
          </Stack>

          <Stack alignItems='center' direction='row' spacing={2}>
            <Typography fontWeight='bold' variant='textbox'>
              Report Code:
            </Typography>
            <Typography color='primary.main' fontWeight='medium'>
              7905
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{mx: (t) => t.spacing(-3)}} />

        <Stack spacing={2}>
          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                Project title:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                Complex project
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                Report date:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                2020-01-01 12:20 AM
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                Project code:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                PRJ-120
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                Project created by:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                John Doe
              </Typography>
            </Box>

            <Box
              display='grid'
              flex={1}
              gridTemplateColumns={{xs: '1fr', xl: '150px 1fr'}}
            >
              <Typography fontWeight='bold' variant='caption'>
                Project created date:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                2020-12-12
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{xs: 'column', md: 'row', lg: 'row', xl: 'column'}}
            gap={2}
          >
            <Box display='grid' flex={1} gap={{xs: 2, md: 2}}>
              <Typography fontWeight='bold' variant='caption'>
                Description:
              </Typography>
              <Typography
                color='neutrals.gray'
                fontWeight='medium'
                variant='caption'
              >
                Lorem ipsum dolor sit amet,consecteturadipiscing elit,sed
                doeiusmod tempor incididun tutlaboreetdoloremagna aliqua.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export const ReportDetails = () => {
  return (
    <CardWithTitle title='Report details'>
      <Stack direction={{xs: 'column', xl: 'row'}} spacing={2}>
        <ReportDetailsInfoCard />
        <Box flex={1}>
          <Outlet />
        </Box>
      </Stack>
    </CardWithTitle>
  )
}
