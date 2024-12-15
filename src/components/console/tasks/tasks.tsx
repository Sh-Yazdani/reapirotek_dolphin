import {Box, Stack} from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {find} from 'lodash-es'
import * as React from 'react'
import {useTranslation} from 'react-i18next'

import type {Task, TaskType} from '@/components'
import {
  createTasksBoardStore,
  generateTaskMap,
  getColumns,
  getTaskMap,
  TaskCardImpl,
  TaskColumnImpl,
  TasksBoard,
  TasksContext,
} from '@/components'
import {createTaskNameBasedOnTaskStatus} from '@/components/console/tasks/board/lib/utils'
import {useBreakpointValues} from '@/hooks'
import type {TaskStatus} from '@/lib/data-provider/api/__generated'
import {useGetAllTasksSuspense} from '@/lib/data-provider/api/__generated'

export const MobileTasksBoard = () => {
  const {t} = useTranslation('tasks')
  const [selectedColumn, setSelectedColumn] = React.useState(
    getColumns(t)[0].status,
  )
  const {data} = useGetAllTasksSuspense({query: {gcTime: 0}})

  const tasks = getTaskMap(data as unknown as Task[], t)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newColumn: TaskStatus,
  ) => {
    if (newColumn !== null) {
      setSelectedColumn(newColumn)
    }
  }

  const selectedColumnObject = find(getColumns(t), {status: selectedColumn})!

  return (
    <Stack gap={2}>
      <ToggleButtonGroup
        aria-label='Platform'
        color='primary'
        size='small'
        sx={{mx: 'auto'}}
        value={selectedColumn}
        exclusive
        onChange={handleChange}
      >
        {getColumns(t).map((_column) => (
          <ToggleButton key={_column.status} value={_column.status}>
            {createTaskNameBasedOnTaskStatus(_column.status)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TaskColumnImpl
        key={selectedColumnObject.status}
        label={selectedColumnObject.label}
        status={selectedColumnObject.status}
      >
        {tasks[selectedColumnObject.status].map((task) => {
          return <TaskCardImpl key={task.id} {...task} />
        })}
      </TaskColumnImpl>
    </Stack>
  )
}

export const TasksBoardImpl = () => {
  const {isMobile} = useBreakpointValues()
  const {t} = useTranslation('tasks')
  const {data} = useGetAllTasksSuspense({query: {gcTime: 0}})
  if (isMobile) return <MobileTasksBoard />

  return (
    <Box className='tasks-board' height='100%' sx={{overflowY: 'auto'}}>
      <TasksBoard
        autoScrollerOptions={{maxPixelScroll: 5}}
        initial={getTaskMap(data as unknown as Task[], t)}
      />
    </Box>
  )
}

interface TasksBoardProps {
  type: TaskType
}

export const Tasks: React.FC<TasksBoardProps> = ({type}) => {
  const {data} = useGetAllTasksSuspense({query: {gcTime: 0}})
  const {t} = useTranslation('tasks')
  const tasks = generateTaskMap(data, t)

  return (
    <TasksContext.Provider
      key={JSON.stringify(tasks)}
      value={createTasksBoardStore({type})}
    >
      <TasksBoardImpl />
    </TasksContext.Provider>
  )
}
