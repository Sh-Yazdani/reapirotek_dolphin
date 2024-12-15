import {Box, Stack} from '@mui/material'
import {Link} from '@tanstack/react-router'

import type {Project} from '@/lib/data-provider/api/__generated'

import {ProjectsListCard} from './projects-list-card'

interface ProjectsListProps {
  projects: Project[]
}

export const ProjectsList: React.FC<ProjectsListProps> = ({projects}) => {
  return (
    <Stack overflow='auto' spacing={{xs: 2, sm: 3}} width='100%'>
      <Box
        display='grid'
        gap={2}
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        overflow='auto'
      >
        {projects.map((project, index) => {
          return (
            <Link
              key={index}
              params={{projectId: project.id as unknown as string}}
              to='/console/projects/$projectId/info'
            >
              <ProjectsListCard {...project} />
            </Link>
          )
        })}
      </Box>
    </Stack>
  )
}
