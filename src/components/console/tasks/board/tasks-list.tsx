import styled from '@emotion/styled'
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd'
import {Draggable, Droppable} from '@hello-pangea/dnd'
import type {Theme} from '@mui/material'
import {styled as MuiStyled} from '@mui/material'
import type {CSSProperties, ReactElement} from 'react'
import React from 'react'

import type {Task} from '@/components'

import {grid} from './lib/constants'
import TaskCard from './task-card'

export const getBackgroundColor = (
  theme: Theme,
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
  /*  if (isDraggingOver) {
    return theme.palette.common.white
  }

  if (isDraggingFrom) {
    return theme.palette.background.default
  } */

  return theme.palette.common.white
}

interface WrapperProps {
  isDraggingOver: boolean
  isDraggingFrom: boolean
  isDropDisabled: boolean
}

const Wrapper = MuiStyled('div')<WrapperProps>(
  ({isDraggingFrom, isDraggingOver, isDropDisabled, theme}) => ({
    backgroundColor: getBackgroundColor(theme, isDraggingOver, isDraggingFrom),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    opacity: isDropDisabled ? 0.5 : 'inherit',
    borderWidth: grid,
    transition: ' background-color 0.2s ease, opacity 0.1s ease',
    userSelect: 'none',
  }),
)

const scrollContainerHeight = 0

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`

const Container = MuiStyled('div')(({theme}) => ({
  // background: theme.palette.common.white,
}))

interface Props {
  listId?: string
  listType?: string
  tasks: Task[]
  internalScroll?: boolean
  scrollContainerStyle?: CSSProperties
  isDropDisabled?: boolean
  isCombineEnabled?: boolean
  style?: CSSProperties
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean
  useClone?: boolean
}

interface TaskListProps {
  tasks: Task[]
}

const InnerQuoteList = (props: TaskListProps): ReactElement => {
  return (
    <>
      {props.tasks.map((task, index: number) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot,
          ) => (
            <TaskCard
              key={task.id}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
              task={task}
            />
          )}
        </Draggable>
      ))}
    </>
  )
}

const InnerQuoteListMemo = React.memo<TaskListProps>(InnerQuoteList)

interface InnerListProps {
  dropProvided: DroppableProvided
  tasks: Task[]
}

const InnerList = (props: InnerListProps) => {
  const {dropProvided, tasks} = props

  return (
    <Container>
      <DropZone ref={dropProvided.innerRef}>
        <InnerQuoteListMemo tasks={tasks} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  )
}

// eslint-disable-next-line react/function-component-definition
export function TasksList(props: Props): ReactElement {
  const {
    ignoreContainerClipping,
    internalScroll,
    isCombineEnabled,
    isDropDisabled,
    listId = 'LIST',
    listType,
    scrollContainerStyle,
    style,
    tasks,
    useClone,
  } = props

  return (
    <Droppable
      droppableId={listId}
      ignoreContainerClipping={ignoreContainerClipping}
      isCombineEnabled={isCombineEnabled}
      isDropDisabled={isDropDisabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <TaskCard
                isDragging={snapshot.isDragging}
                provided={provided}
                task={tasks[descriptor.source.index]}
                isClone
              />
            )
          : undefined
      }
      type={listType}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={Boolean(isDropDisabled)}
          style={style}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList dropProvided={dropProvided} tasks={tasks} />
            </ScrollContainer>
          ) : (
            <InnerList dropProvided={dropProvided} tasks={tasks} />
          )}
        </Wrapper>
      )}
    </Droppable>
  )
}
