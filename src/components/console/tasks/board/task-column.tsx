import {colors} from '@atlaskit/theme'
import styled from '@emotion/styled'
import type {DraggableProvided, DraggableStateSnapshot} from '@hello-pangea/dnd'
import {Draggable} from '@hello-pangea/dnd'
import {Card, Stack, Typography} from '@mui/material'
import {Add} from 'iconsax-react'
import type {ReactElement, ReactNode} from 'react'
import React, {Component, useState} from 'react'
import {useTranslation} from 'react-i18next'

import type {Column, Task} from '@/components'
import {AddTaskModal} from '@/components'
import {createTaskNameBasedOnTaskStatus} from '@/components/console/tasks/board/lib/utils'
import {useBreakpointValues} from '@/hooks'
import type {TaskStatus} from '@/lib/data-provider/api/__generated'

import {TasksList} from './tasks-list'

interface TaskColumnProps extends Omit<Column, 'id'> {
  children: ReactNode
}

export const TaskColumnImpl: React.FC<TaskColumnProps> = ({
  children,
  label,
  status,
}) => {
  const {isMobile} = useBreakpointValues()
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false)

  const handleOpen = () => {
    setAddTaskModalOpen(true)
  }

  const handleClose = () => {
    setAddTaskModalOpen(false)
  }

  const {t} = useTranslation('tasks')
  return (
    <Card
      sx={{
        padding: 2,
        flexShrink: 0,
        minWidth: {md: 320},
        maxWidth: {md: 320},
        width: '100%',
      }}
    >
      <AddTaskModal
        isOpen={addTaskModalOpen}
        taskStatus={status}
        onClose={handleClose}
      />

      <Stack height='100%' spacing={2}>
        {!isMobile && (
          <Typography fontWeight='bold' variant='t2'>
            {createTaskNameBasedOnTaskStatus(label)}
          </Typography>
        )}

        <Stack height='fit-content' spacing={2}>
          {children}
        </Stack>

        <Stack
          alignItems='center'
          className='cursor-pointer'
          color='neutrals.gray'
          direction='row'
          mb='auto'
          mt={2}
          width='100%'
          onClick={handleOpen}
        >
          <Add />
          <Typography
            className='cursor-pointer'
            fontWeight='bold'
            variant='textbox'
          >
            {t('add-task', {defaultValue: 'Add Task'})}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  status: TaskStatus
  tasks: Task[]
  index: number
  isScrollable?: boolean
  isCombineEnabled?: boolean
  useClone?: boolean
  label: string
}

export default class TaskColumn extends Component<Props> {
  render(): ReactElement {
    const status = this.props.status
    const label = this.props.label
    const tasks: Task[] = this.props.tasks
    const index: number = this.props.index
    return (
      <Draggable draggableId={status} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <TaskColumnImpl label={label} status={status}>
              <TasksList
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                listId={status}
                listType='Task'
                style={{
                  backgroundColor: snapshot.isDragging ? colors.G50 : undefined,
                }}
                tasks={tasks}
                useClone={Boolean(this.props.useClone)}
              />
            </TaskColumnImpl>
          </Container>
        )}
      </Draggable>
    )
  }
}
