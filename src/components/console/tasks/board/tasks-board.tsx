import styled from '@emotion/styled'
import type {DropResult} from '@hello-pangea/dnd'
import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import type {PartialAutoScrollerOptions} from '@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types'
import {find, get, pick} from 'lodash-es'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'

import {getColumns} from '@/components/console/tasks/data'
import type {Task, TaskStatus} from '@/lib/data-provider/api/__generated'
import {useUpdateTask} from '@/lib/data-provider/api/__generated'

import {grid} from './lib/constants'
import reorder, {reorderTaskMap} from './lib/reorder'
import type {TaskMap} from './lib/types'
import TaskColumn from './task-column'

interface ParentContainerProps {
  height: string
}

const ParentContainer = styled.div<ParentContainerProps>`
  height: ${({height}) => height};
  overflow-x: hidden;
  overflow-y: auto;
`

const Container = styled.div`
  /* min-height: 200vh; */
  /* like display:flex but will allow bleeding over the window width */
  /* min-width: 100vw; */
  display: inline-flex;
  gap: ${grid}px;
  height: 100%;
`

interface Props {
  initial: TaskMap
  withScrollableColumns?: boolean
  isCombineEnabled?: boolean
  containerHeight?: string
  useClone?: boolean
  autoScrollerOptions?: PartialAutoScrollerOptions
}

export const TasksBoard: React.FC<Props> = ({
  autoScrollerOptions,
  containerHeight,
  initial,
  isCombineEnabled = false,
  useClone,
  withScrollableColumns,
}) => {
  const [columns, setColumns] = useState<TaskMap>(initial)
  const [ordered, setOrdered] = useState<string[]>(Object.keys(initial))
  const {mutate: updateTask} = useUpdateTask()
  const {t} = useTranslation('tasks')

  const updateTaskStatus = (result: DropResult) => {
    const tasks = columns[result.source.droppableId]
    const task = find(tasks, {id: result.draggableId})
    updateTask({
      id: result.draggableId,
      data: {
        ...pick(task, ['title', 'description']),
        status: result.destination?.droppableId as TaskStatus,
      } as unknown as Task,
    })
  }

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...ordered]
        shallow.splice(result.source.index, 1)
        setOrdered(shallow)
        return
      }

      const column = columns[result.source.droppableId]
      const withQuoteRemoved = [...column]
      withQuoteRemoved.splice(result.source.index, 1)
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      }
      setColumns(newColumns)
      return
    }

    // dropped nowhere
    if (!result.destination) {
      return
    }

    const source = result.source
    const destination = result.destination

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const nextValue = reorder(ordered, source.index, destination.index)
      setOrdered(nextValue)
      return
    }

    const data = reorderTaskMap({
      taskMap: columns,
      source,
      destination,
    })

    setColumns(data.taskMap)
    updateTaskStatus(result)
  }

  const findColumnByStatus = (status: string) => {
    return find(getColumns(t), {status})!
  }

  return (
    <DragDropContext
      autoScrollerOptions={autoScrollerOptions}
      onDragEnd={onDragEnd}
    >
      {containerHeight ? (
        <ParentContainer height={containerHeight}>
          <Droppable
            direction='horizontal'
            droppableId='board'
            ignoreContainerClipping={Boolean(containerHeight)}
            isCombineEnabled={isCombineEnabled}
            type='COLUMN'
          >
            {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {ordered.map((key, index) => (
                  <TaskColumn
                    key={key}
                    index={index}
                    isCombineEnabled={isCombineEnabled}
                    isScrollable={withScrollableColumns}
                    label={get(findColumnByStatus(key), 'label')!}
                    status={key as TaskStatus}
                    tasks={columns[key]}
                    useClone={useClone}
                  />
                ))}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </ParentContainer>
      ) : (
        <Droppable
          direction='horizontal'
          droppableId='board'
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={isCombineEnabled}
          type='COLUMN'
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {ordered.map((key, index) => (
                <TaskColumn
                  key={key}
                  index={index}
                  isCombineEnabled={isCombineEnabled}
                  isScrollable={withScrollableColumns}
                  label={get(findColumnByStatus(key), 'label')!}
                  status={key as TaskStatus}
                  tasks={columns[key]}
                  useClone={useClone}
                />
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      )}
    </DragDropContext>
  )
}
