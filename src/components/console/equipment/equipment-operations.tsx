/* eslint-disable */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {Link} from '@tanstack/react-router'
import {get} from 'lodash-es'
import type {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableOptions,
} from 'material-react-table'
import {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDeepCompareMemo} from 'use-deep-compare'

import type {OperationsDataTableProps} from '@/components'
import {OperationsDataTable} from '@/components'
import type {Equipment} from '@/lib/data-provider/api/__generated'
import {
  useCreateEquipment,
  useDeleteEquipment,
  useGetAllEquipmentSuspense,
  useUpdateEquipment,
} from '@/lib/data-provider/api/__generated'
import {lineClamp} from '@/lib/material-ui/theme/mixins'
import {refetchAllEquipment} from '@/utils/cache'

// eslint-disable-next-line max-lines-per-function
export const EquipmentOperations = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({})

  const {t, i18n} = useTranslation('equipment')
  const columns = useMemo<MRT_ColumnDef<Equipment>[]>(
    () => [
      {
        accessorKey: 'equipmentCode',
        header: t('tables.columns.equipment-code', {
          defaultValue: 'Equipment Code',
        }),
      },
      {
        accessorKey: 'name',
        header: t('tables.columns.name', {defaultValue: 'Name'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.name,
          helperText: validationErrors.name,
          // remove any previous validation errors when equipment focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          // optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'equipmentModel',
        header: t('tables.columns.model', {defaultValue: 'Model'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.equipmentModel,
          helperText: validationErrors.equipmentModel,
          // remove any previous validation errors when equipment focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              equipmentModel: undefined,
            }),
          // optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'description',
        header: t('tables.columns.description', {defaultValue: 'Description'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.description,
          helperText: validationErrors.description,
          // remove any previous validation errors when equipment focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
        Cell(props) {
          const value = props.row.original.description!
          return (
            <Tooltip title={value}>
              <Typography sx={lineClamp(2)}>{value}</Typography>
            </Tooltip>
          )
        },
      },
      {
        accessorKey: 'pricePerHour',
        header: t('tables.columns.price-per-hour', {
          defaultValue: 'Price per hour',
        }),
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          error: !!validationErrors.pricePerHour,
          helperText: validationErrors.pricePerHour,
          // remove any previous validation errors when equipment focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pricePerHour: undefined,
            }),
        },
      },
      {
        accessorKey: 'count',
        header: t('tables.columns.count', {defaultValue: 'Count'}),
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          error: !!validationErrors.count,
          helperText: validationErrors.count,
          // remove any previous validation errors when equipment focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              count: undefined,
            }),
        },
      },
    ],
    [validationErrors, i18n.language],
  )

  // call CREATE hook
  const {isPending: isCreatingEquipment, mutateAsync: createEquipment} =
    useCreateEquipment()
  // call READ hook
  const {data: fetchedEquipment = [], isFetching: isFetchingEquipment} =
    useGetAllEquipmentSuspense()
  // call UPDATE hook
  const {isPending: isUpdatingEquipment, mutateAsync: updateEquipment} =
    useUpdateEquipment()
  // call DELETE hook
  const {isPending: isDeletingEquipment, mutateAsync: deleteEquipment} =
    useDeleteEquipment()

  // CREATE action
  const handleCreateEquipment: MRT_TableOptions<Equipment>['onCreatingRowSave'] =
    async ({table, values}) => {
      const newValidationErrors = validateEquipment(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }
      setValidationErrors({})
      await createEquipment({data: values})
      table.setCreatingRow(null) // exit creating mode
    }

  // UPDATE action
  const handleSaveEquipment: MRT_TableOptions<Equipment>['onEditingRowSave'] =
    async ({row, table, values}) => {
      const newValidationErrors = validateEquipment(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }
      setValidationErrors({})
      await updateEquipment({
        data: values,
        id: get(row.original, 'id') as unknown as string,
      })
      table.setEditingRow(null) // exit editing mode
    }

  // DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<Equipment>) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      await deleteEquipment({id: get(row.original, 'id') as unknown as string})
      refetchAllEquipment()
    }
  }

  const config: OperationsDataTableProps<Equipment> = useDeepCompareMemo(
    () => ({
      data: fetchedEquipment,
      columns,
      // editDisplayMode: 'row', //
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateEquipment,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveEquipment,
      renderRowActions: ({row, table}) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <Link
            to='/console/equipment/operations/edit/$equipmentId'
            /* @ts-ignore TODO -> Swagger issues */
            params={{equipmentId: row.original.id}}
          >
            <Tooltip title='Edit'>
              <IconButton /* onClick={() => table.setEditingRow(row)} */>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title='Delete'>
            <IconButton
              color='error'
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({table}) => (
        <Stack direction='row' mb={2} spacing={2}>
          <Link to='/console/equipment/operations/add'>
            <Button
              variant='contained'
              onClick={() => {
                // table.setCreatingRow(true) // simplest way to open the create row modal with no default values
                // or you can pass in a row object to set default values with the `createRow` helper function
                // table.setCreatingRow(
                //   createRow(table, {
                //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                //   }),
                // );
              }}
            >
              {t('add', {defaultValue: 'Add new equipment'})}
            </Button>
          </Link>

          {/* <Button
            variant='contained'
            onClick={() => {
              table.setCreatingRow(true) //simplest way to open the create row modal with no default values
              //or you can pass in a row object to set default values with the `createRow` helper function
              // table.setCreatingRow(
              //   createRow(table, {
              //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
              //   }),
              // );
            }}
          >
            Quick add equipment
          </Button> */}
        </Stack>
      ),
      state: {
        isSaving:
          isCreatingEquipment || isUpdatingEquipment || isDeletingEquipment,
        showProgressBars: isFetchingEquipment,
      },
    }),
    [
      columns,
      isCreatingEquipment,
      isDeletingEquipment,
      isFetchingEquipment,
      isUpdatingEquipment,
    ],
  )
  return <OperationsDataTable {...config} />
}

const validateRequired = (value: number | string) => {
  if (typeof value === 'string') {
    return !!value.length
  }

  return value > 0
}

function validateEquipment(equipment: Equipment) {
  return {
    name: !validateRequired(equipment.name) ? 'Name is Required' : '',
    model: !validateRequired(equipment.equipmentModel)
      ? 'Model is required'
      : '',
    description: !validateRequired(equipment.description!)
      ? 'Description is required'
      : '',
    pricePerHour: !validateRequired(equipment.pricePerHour!)
      ? 'Price per hour is required'
      : '',
    count: !validateRequired(equipment.count) ? 'Count is invalid' : '',
  }
}
