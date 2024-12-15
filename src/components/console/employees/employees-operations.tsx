/* eslint-disable */
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {Box, Button, IconButton, Stack, Tooltip} from '@mui/material'
import {
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
} from 'material-react-table'
import {useMemo, useState} from 'react'
import {useDeepCompareMemo} from 'use-deep-compare'

import {OperationsDataTable, OperationsDataTableProps} from '@/components'
import {
  Employee,
  useCreateEmployee,
  useDeleteEmployee,
  useGetAllEmployeesSuspense,
  useUpdateEmployee,
} from '@/lib/data-provider/api/__generated'

import {Link} from '@tanstack/react-router'
import {omit} from 'lodash-es'
import {refetchAllEmployees} from '@/utils/cache'
import {useTranslation} from 'react-i18next'

export const EmployeesOperations = () => {
  const {t} = useTranslation('employees')
  const {
    data: employees = [],
    isFetching: isFetchingEmployees,
    isLoading: isLoadingEmployees,
  } = useGetAllEmployeesSuspense()

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({})

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'employeeCode',
        header: t('tables.columns.employee-code', {
          defaultValue: 'Employee Code',
        }),
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: t('tables.columns.first-name', {defaultValue: 'First Name'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.firstName,
          helperText: validationErrors.firstName,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          // optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'lastName',
        header: t('tables.columns.last-name', {defaultValue: 'Last Name'}),
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors.lastName,
          helperText: validationErrors.lastName,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: t('tables.columns.email', {defaultValue: 'Email'}),
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors.email,
          helperText: validationErrors.email,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
    ],
    [validationErrors, t],
  )

  const {isPending: isCreatingEmployee, mutateAsync: createEmployee} =
    useCreateEmployee()

  // call UPDATE hook
  const {isPending: isUpdatingEmployee, mutateAsync: updateEmployee} =
    useUpdateEmployee()
  // call DELETE hook
  const {isPending: isDeletingEmployee, mutateAsync: deleteEmployee} =
    useDeleteEmployee()

  // CREATE action
  const handleCreateUser: MRT_TableOptions<Employee>['onCreatingRowSave'] =
    async ({table, values}) => {
      const newValidationErrors = validateUser(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }
      setValidationErrors({})
      await createEmployee({data: omit(values, 'id') as unknown as Employee})
      table.setCreatingRow(null) // exit creating mode
    }

  // UPDATE action
  const handleSaveUser: MRT_TableOptions<Employee>['onEditingRowSave'] =
    async ({table, values}) => {
      const newValidationErrors = validateUser(values)

      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors)
        return
      }
      setValidationErrors({})
      await updateEmployee({
        data: omit(values, 'id') as unknown as Employee,
        id: values.id,
      })
      table.setEditingRow(null) // exit editing mode
    }

  // DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<Employee>) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      /* @ts-ignore TODO -> FIX THIS */
      await deleteEmployee({id: row.original.id})
      refetchAllEmployees()
    }
  }
  const config: OperationsDataTableProps<Employee> = useDeepCompareMemo(
    () => ({
      data: employees,
      columns,
      // editDisplayMode: 'row', //
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateUser,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveUser,
      renderRowActions: ({row, table}) => {
        return (
          <Stack gap={2} direction={'row'}>
            <Link
              to={'/console/employees/operations/edit/$employeeId'}
              params={{employeeId: row.original.id as string}}
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
          </Stack>
        )
      },
      renderTopToolbarCustomActions: ({table}) => (
        <Stack direction={'row'} spacing={2} mb={2}>
          <Link to='/console/employees/operations/add'>
            <Button variant='contained'>
              {t('add', {defaultValue: 'Add new employee'})}
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
            Quick add employee
          </Button> */}
        </Stack>
      ),
      state: {
        isLoading: isLoadingEmployees,
        isSaving:
          isCreatingEmployee || isUpdatingEmployee || isDeletingEmployee,
        showProgressBars: isFetchingEmployees,
      },
    }),
    [
      columns,
      isCreatingEmployee,
      isDeletingEmployee,
      isFetchingEmployees,
      isLoadingEmployees,
      isUpdatingEmployee,
    ],
  )
  return <OperationsDataTable {...config} />
}

const validateRequired = (value: string) => !!value.length
const validateEmail = (email: string) =>
  !!email.length &&
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(
    email.toLowerCase(),
  )

function validateUser(user: Employee) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  }
}
