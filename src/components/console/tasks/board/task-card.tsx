import {colors} from '@atlaskit/theme'
import styled from '@emotion/styled'
import type {DraggableProvided} from '@hello-pangea/dnd'
import {
  Avatar,
  avatarClasses,
  AvatarGroup,
  Box,
  Card,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {Link, useLocation} from '@tanstack/react-router'
import {Edit, Trash} from 'iconsax-react'
import type {CSSProperties} from 'react'
import React, {Fragment} from 'react'

import type {Task, TaskType} from '@/components'
import {IconContainer, useTasksBoardState} from '@/components'
import {useBreakpointValues} from '@/hooks'
import {useBoolean} from '@/hooks/useBooleanValue'
import {useDeleteTask} from '@/lib/data-provider/api/__generated'
import {lineClamp} from '@/lib/material-ui/theme/mixins'
import {refetchAllTasks} from '@/utils/cache'

import {DeleteTaskModal} from './delete-task-modal'
import {borderRadius, grid} from './lib/constants'

interface TaskCardProps extends Task {
  onDeleteTask: () => void
}
interface CommonImplTaskProps {
  type: TaskType
}

const DesktopTaskCardImpl: React.FC<CommonImplTaskProps & TaskCardProps> = ({
  assignees = [],
  date,
  description,
  id,
  onDeleteTask,
  projectCode,
  title,
  type,
}) => {
  const avatarSize = 20
  const pathname = useLocation({select: (s) => s.pathname})

  return (
    <Card
      component={Stack}
      spacing={2}
      sx={{
        bgcolor: 'background.default',
        padding: 2,
        cursor: 'grab',
        width: '100%',
      }}
    >
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <Tooltip title={title}>
          <Typography fontWeight='bold' sx={lineClamp(1)} variant='textbox'>
            {title}
          </Typography>
        </Tooltip>
        {/* {isUserTasks ? (
          <Tooltip title={projectCode}>
            <Typography
              color='neutrals.description'
              fontSize={{xs: 10, sm: 12}}
              variant='inherit'
              noWrap
            >
              Project Code:
              {projectCode}
            </Typography>
          </Tooltip>
        ) : null} */}
      </Stack>

      <Typography
        color='neutrals.gray'
        sx={{...lineClamp(2), wordBreak: 'break-all'}}
        variant='caption'
      >
        {description}
      </Typography>

      <Stack alignItems='center' direction='row' gap={2}>
        {/*  <Typography color='secondary.main' variant='small'>
          {date}
        </Typography> */}

        <AvatarGroup
          max={4}
          sx={{
            [`& .${avatarClasses.root}`]: {
              width: avatarSize,
              height: avatarSize,
              fontSize: 12,
            },
          }}
          variant='circular'
        >
          {assignees.map((assignee) => {
            return <Avatar key={assignee.id} src={assignee.profilePhoto} />
          })}
        </AvatarGroup>

        <Stack
          alignItems='center'
          className='cursor-pointer'
          direction='row'
          ml='auto'
          spacing={1}
        >
          <IconContainer
            color='neutrals.description'
            component={Trash}
            size={16}
            onClick={onDeleteTask}
          />

          <Link
            params={{taskId: id}}
            search={{redirect: pathname}}
            // to={
            //   isUserTasks
            //     ? '/console/tasks/$taskId'
            //     : '/console/projects/$projectId/tasks/$taskId'
            // }
            to={`${pathname}/$taskId`}
          >
            <Stack>
              <IconContainer
                color='neutrals.description'
                component={Edit}
                size={16}
              />
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Card>
  )
}

const MobileTaskCardImpl: React.FC<CommonImplTaskProps & TaskCardProps> = ({
  assignees = [],
  date,
  description,
  id,
  onDeleteTask,
  projectCode,
  title,
  type,
}) => {
  const avatarSize = 16
  const pathname = useLocation({select: (s) => s.pathname})
  return (
    <Box
      borderRadius={5}
      component={Stack}
      p={1}
      spacing={2}
      sx={{
        bgcolor: 'background.default',
        width: '100%',
      }}
    >
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <Tooltip title={title}>
          <Typography
            color='common.black'
            fontWeight='bold'
            variant='textbox'
            noWrap
          >
            {title}
          </Typography>
        </Tooltip>

        {/* {isUserTasks ? (
          <Tooltip title={projectCode}>
            <Typography
              color='neutrals.description'
              fontSize={10}
              variant='inherit'
              noWrap
            >
              Project Code:
              {projectCode}
            </Typography>
          </Tooltip>
        ) : null} */}
      </Stack>

      <Typography
        color='neutrals.gray'
        sx={{...lineClamp(2), wordBreak: 'break-all'}}
        variant='caption'
      >
        {description}
      </Typography>

      <Stack alignItems='center' direction='row' gap={3}>
        {/*  <Typography color='secondary.main' fontWeight='medium' variant='small'>
          {date}
        </Typography> */}

        <AvatarGroup
          max={4}
          sx={{
            [`& .${avatarClasses.root}`]: {
              width: avatarSize,
              height: avatarSize,
              fontSize: 12,
            },
          }}
        >
          {assignees.map((assignee) => {
            return <Avatar key={assignee.id} src={assignee.profilePhoto} />
          })}
        </AvatarGroup>

        <Stack alignItems='center' direction='row' ml='auto' spacing={1}>
          <IconContainer
            color='neutrals.description'
            component={Trash}
            size={18}
            onClick={onDeleteTask}
          />

          <Link
            params={{taskId: id}}
            search={{redirect: pathname}}
            to={`${pathname}/$taskId`}
          >
            <Stack>
              <IconContainer
                color='neutrals.description'
                component={Edit}
                ml='auto'
                size={18}
              />
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export const TaskCardImpl: React.FC<Omit<TaskCardProps, 'onDeleteTask'>> = (
  props,
) => {
  const [isDeleteTaskModalOpen, {close, open}] = useBoolean()
  const {isMobile} = useBreakpointValues()
  const type = useTasksBoardState((s) => s.type)
  const {isPending: deleteTaskIsPending, mutate: deleteTask} = useDeleteTask()

  const content = (() => {
    if (isMobile)
      return <MobileTaskCardImpl type={type} onDeleteTask={open} {...props} />
    return <DesktopTaskCardImpl type={type} onDeleteTask={open} {...props} />
  })()

  return (
    <Fragment>
      {content}

      <DeleteTaskModal
        isPending={deleteTaskIsPending}
        open={isDeleteTaskModalOpen}
        onClose={close}
        onConfirm={() => {
          deleteTask(
            {id: props.id},
            {
              onSuccess() {
                refetchAllTasks()
                close()
              },
            },
          )
        }}
      />
    </Fragment>
  )
}

interface Props {
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: CSSProperties
  index?: number
  task: Task
}
const imageSize = 40

interface ContainerProps {
  isDragging: boolean
  isGroupedOver: boolean
}

const Container = styled.div<ContainerProps>`
  border-radius: ${borderRadius}px;
  border: 1px solid transparent;
  box-shadow: ${({isDragging}) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  box-sizing: border-box;

  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;
  border-radius: 5px;

  /* color: ${colors.N900}; */

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  display: flex;
`

function getStyle(provided: DraggableProvided, style?: CSSProperties | null) {
  if (!style) {
    return provided.draggableProps.style
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  }
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
const TaskCard = (props: Props) => {
  const {index, isDragging, isGroupedOver, provided, style, task} = props

  return (
    <Container
      ref={provided.innerRef}
      isDragging={isDragging}
      isGroupedOver={Boolean(isGroupedOver)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      aria-label={`${task.title} quote ${task.description}`}
      data-index={index}
      data-is-dragging={isDragging}
      data-testid={task.id}
      style={getStyle(provided, style)}
    >
      <TaskCardImpl {...task} />
    </Container>
  )
}

export default React.memo<Props>(TaskCard)
