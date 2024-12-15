import {zodResolver} from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type {TFunction} from 'i18next'
import {get} from 'lodash-es'
import type {ComponentProps} from 'react'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {
  CloseIcon,
  FormAutoComplete,
  FormCheckbox,
  TableCell,
  TableHeadCell,
} from '@/components'

import {
  accesses,
  createRoleModificationFormDefaultValues,
  resources,
} from './permissions-data'

interface RoleModificationFormViewProps {
  onSubmit: SubmitHandler<RoleModificationFormValues>
  userName: string
  onClose: () => void
}

// eslint-disable-next-line max-lines-per-function
const RoleModificationFormView: React.FC<RoleModificationFormViewProps> = ({
  onClose,
  onSubmit,
  userName,
}) => {
  const {t} = useTranslation('employees')
  const form = useFormContext<RoleModificationFormValues>()

  const {fields} = useFieldArray<RoleModificationFormValues, 'permissions'>({
    control: form.control,
    name: 'permissions',
  })

  return (
    <Box sx={{overflow: 'auto'}}>
      <Stack
        component='form'
        spacing={2}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Stack direction='row' justifyContent='space-between'>
          <Typography fontWeight='bold' variant='t2'>
            {t('role-modification-form.user-permissions', {
              defaultValue: '{{userName}} Permissions',
              userName,
            })}
          </Typography>

          <CloseIcon onClick={onClose} />
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>
                {t('role-modification-form.entity', {
                  defaultValue: 'Entity',
                })}
              </TableHeadCell>

              {accesses.map((access) => {
                return (
                  <TableHeadCell key={access.name} sx={{px: 0}}>
                    {access.label}
                  </TableHeadCell>
                )
              })}

              <TableHeadCell>
                {t('role-modification-form.column-read-blacklist', {
                  defaultValue: 'Column READ blacklist',
                })}
              </TableHeadCell>
              <TableHeadCell>
                {t('role-modification-form.column-write-blacklist', {
                  defaultValue: 'Column WRITE blacklist',
                })}
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((resource, index) => {
              const isReadBlacklistDisabled = !get(
                form.watch(),
                `permissions.${index}.view.value`,
              )

              const hasAddPermission = get(
                form.watch(),
                `permissions.${index}.add.value`,
              )
              const hasEditPermission = get(
                form.watch(),
                `permissions.${index}.edit.value`,
              )

              const isWriteBlacklistDisabled = !(
                hasAddPermission || hasEditPermission
              )

              return (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell sx={{px: 0}}>
                    <FormCheckbox
                      hasErrorMessageLabel={false}
                      name={`permissions.${index}.view.value`}
                    />
                  </TableCell>
                  <TableCell sx={{px: 0}}>
                    <FormCheckbox
                      hasErrorMessageLabel={false}
                      name={`permissions.${index}.add.value`}
                    />
                  </TableCell>
                  <TableCell sx={{px: 0}}>
                    <FormCheckbox
                      hasErrorMessageLabel={false}
                      name={`permissions.${index}.edit.value`}
                    />
                  </TableCell>
                  <TableCell sx={{px: 0}}>
                    <FormCheckbox
                      hasErrorMessageLabel={false}
                      name={`permissions.${index}.delete.value`}
                    />
                  </TableCell>

                  <TableCell>
                    <FormAutoComplete
                      disabled={isReadBlacklistDisabled}
                      hasErrorMessageLabel={false}
                      label={t('role-modification-form.choose-columns', {
                        defaultValue: 'Choose Columns',
                      })}
                      name={`permissions.${index}.view.table.blacklist.read.columns`}
                      options={resource.view.table.columns.map((column) => ({
                        label: column.header,
                        value: column.accessorId,
                      }))}
                      size='small'
                      disableClearable
                      multiple
                    />
                  </TableCell>

                  <TableCell>
                    <FormAutoComplete
                      disabled={isWriteBlacklistDisabled}
                      hasErrorMessageLabel={false}
                      label={t('role-modification-form.choose-columns', {
                        defaultValue: 'Choose Columns',
                      })}
                      name={`permissions.${index}.view.table.blacklist.write.columns`}
                      options={resource.view.table.columns.map((column) => ({
                        label: column.header,
                        value: column.accessorId,
                      }))}
                      size='small'
                      disableClearable
                      multiple
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <Button
          sx={{alignSelf: 'flex-start', mt: 2}}
          type='submit'
          variant='contained'
        >
          {t('role-modification-form.save', {defaultValue: 'Save'})}
        </Button>
      </Stack>
    </Box>
  )
}

const ColumnSchema = z.object({accessorId: z.string(), header: z.string()})
const ColumnsSchema = z.object({
  columns: z.array(ColumnSchema),
})

const BlacklistSchema = z.object({
  read: ColumnsSchema,
  write: ColumnsSchema,
})

export const getRoleModificationSchema = (t: TFunction<'employees'>) =>
  z.object({
    permissions: z.array(
      z.object({
        name: z.string().min(2, {
          message: t('role-modification-form.errors.permission-name-invalid', {
            defaultValue: 'Name is incorrect',
          }),
        }),
        description: z.string().min(2, {
          message: t(
            'role-modification-form.errors.permission-description-invalid',
            {
              defaultValue: 'Description is incorrect',
            },
          ),
        }),
        view: z.object({
          value: z.boolean(),
          table: z.object({
            blacklist: BlacklistSchema,
            columns: z.array(ColumnSchema),
          }),
        }),
        add: z.object({value: z.boolean()}),
        edit: z.object({value: z.boolean()}),
        delete: z.object({value: z.boolean()}),
      }),
    ),
  })

export type RoleModificationFormValues = z.infer<
  ReturnType<typeof getRoleModificationSchema>
>

const defaultValues: RoleModificationFormValues = {
  permissions: createRoleModificationFormDefaultValues(resources),
}

interface RoleModificationFormProps {
  userName: string
  onClose: () => void
}

export const RoleModificationForm: React.FC<RoleModificationFormProps> = ({
  onClose,
  userName,
}) => {
  const {t} = useTranslation('employees')

  const onSubmit: ComponentProps<
    typeof RoleModificationFormView
  >['onSubmit'] = (data) => {
    console.log(data)
    onClose()
  }

  const form = useForm({
    defaultValues,
    resolver: zodResolver(getRoleModificationSchema(t)),
  })
  return (
    <FormProvider {...form}>
      <RoleModificationFormView
        userName={userName}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}
