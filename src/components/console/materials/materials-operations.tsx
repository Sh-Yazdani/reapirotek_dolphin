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
import {
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
} from 'material-react-table'
import {useMemo, useState} from 'react'
import {useDeepCompareMemo} from 'use-deep-compare'

import {OperationsDataTable, OperationsDataTableProps} from '@/components'
import {lineClamp} from '@/lib/material-ui/theme/mixins'
import {Link} from '@tanstack/react-router'

import {
  Material,
  useCreateMaterial,
  useDeleteMaterial,
  useGetAllMaterialsSuspense,
  useUpdateMaterial,
} from '@/lib/data-provider/api/__generated'
import {omit} from 'lodash-es'
import {refetchAllMaterials} from '@/utils/cache'
import {useTranslation} from 'react-i18next'

export const MaterialsOperations = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({})
  const {t, i18n} = useTranslation('materials')
  const columns = useMemo<MRT_ColumnDef<Material>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        /* @ts-ignore swagger issues */
        accessorKey: 'materialCode',
        header: t('tables.columns.material-code', {
          defaultValue: 'Material Code',
        }),
      },
      {
        accessorKey: 'name',
        header: t('tables.columns.name', {defaultValue: 'Name'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.name,
          helperText: validationErrors.name,
          // remove any previous validation errors when material focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          // optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'description',
        header: t('tables.columns.description', {
          defaultValue: 'Description',
        }),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.description,
          helperText: validationErrors.description,
          // remove any previous validation errors when material focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
        Cell(props) {
          const value = props.row?.original?.description as string
          return (
            <Tooltip title={value}>
              <Typography sx={lineClamp(2)}>{value}</Typography>
            </Tooltip>
          )
        },
      },
      {
        accessorKey: 'pricePerUnit',
        header: t('tables.columns.price-per-unit', {
          defaultValue: 'Price per unit',
        }),

        muiEditTextFieldProps: {
          required: true,
          type: '',
          error: !!validationErrors.pricePerUnit,
          helperText: validationErrors.pricePerUnit,
          // remove any previous validation errors when material focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pricePerUnit: undefined,
            }),
        },
      },
      {
        accessorKey: 'value',
        header: t('tables.columns.value', {defaultValue: 'Value'}),
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          error: !!validationErrors.value,
          helperText: validationErrors.value,
          // remove any previous validation errors when material focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              value: undefined,
            }),
        },
      },
      {
        accessorKey: 'unit',
        header: t('tables.columns.unit', {defaultValue: 'Unit'}),
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          error: !!validationErrors.unit,
          helperText: validationErrors.unit,
          // remove any previous validation errors when material focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              unit: undefined,
            }),
        },
      },
    ],
    [validationErrors, i18n.language],
  )

  // call CREATE hook
  const {isPending: isCreatingMaterial, mutateAsync: createMaterial} =
    useCreateMaterial()
  // call READ hook
  const {data: fetchedMaterials = [], isFetching: isFetchingMaterials} =
    useGetAllMaterialsSuspense()

  // call UPDATE hook
  const {isPending: isUpdatingMaterial, mutateAsync: updateMaterial} =
    useUpdateMaterial()
  // call DELETE hook
  const {isPending: isDeletingMaterial, mutateAsync: deleteMaterial} =
    useDeleteMaterial()

  // CREATE action
  const handleCreateMaterial: MRT_TableOptions<Material>['onCreatingRowSave'] =
    async ({table, values}) => {
      const newValidationErrors = validateMaterial(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }
      setValidationErrors({})
      await createMaterial({data: omit(values, 'id') as unknown as Material})
      table.setCreatingRow(null) // exit creating mode
    }

  // UPDATE action
  const handleSaveMaterial: MRT_TableOptions<Material>['onEditingRowSave'] =
    async ({table, values, row}) => {
      const newValidationErrors = validateMaterial(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }

      setValidationErrors({})
      /* @ts-ignore TODO -> fix this */
      await updateMaterial({data: values, id: row.original.id})
      table.setEditingRow(null) // exit editing mode
    }

  // DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<Material>) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      await deleteMaterial({id: row.original.id as string})
      refetchAllMaterials()
    }
  }
  const config: OperationsDataTableProps<Material> = useDeepCompareMemo(
    () => ({
      data: fetchedMaterials,
      columns,
      // editDisplayMode: 'row', //
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateMaterial,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveMaterial,
      renderRowActions: ({row, table}) => (
        <Box sx={{display: 'flex', gap: '1rem'}}>
          <Link
            to='/console/materials/operations/edit/$materialId'
            params={{materialId: row.original.id as unknown as string}}
          >
            <Tooltip title='Edit'>
              <IconButton>
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
        <Stack direction={'row'} spacing={2} mb={2}>
          <Link to='/console/materials/operations/add'>
            <Button
              variant='contained'
              onClick={() => {
                table.setCreatingRow(true) // simplest way to open the create row modal with no default values
              }}
            >
              {t('add', {defaultValue: 'Add New Material'})}
            </Button>
          </Link>

          {/* <Button
            variant='contained'
            onClick={() => {
              table.setCreatingRow(true) //simplest way to open the create row modal with no default values
            }}
          >
            Quick add material
          </Button> */}
        </Stack>
      ),
      initialState: {
        columnVisibility: {
          id: false,
        },
      },
      state: {
        isSaving:
          isCreatingMaterial || isUpdatingMaterial || isDeletingMaterial,
        showProgressBars: isFetchingMaterials,
      },
    }),
    [
      columns,
      isCreatingMaterial,
      isDeletingMaterial,
      isFetchingMaterials,
      isUpdatingMaterial,
    ],
  )

  return <OperationsDataTable {...config} />
}

const validateRequired = (value: string | number) => {
  if (typeof value === 'string') {
    return !!value.length
  }

  return value > 0
}

function validateMaterial(material: Material) {
  return {
    name: !validateRequired(material.name) ? 'Name is Required' : '',
    description: !validateRequired(material.name)
      ? 'description is Required'
      : '',

    pricePerUnit: !validateRequired(material.pricePerUnit!)
      ? 'pricePerUnit is required'
      : '',
    value: !validateRequired(material.value) ? 'Value is required' : '',
    unit: !validateRequired(material.unit) ? 'Unit is required' : '',
  }
}
