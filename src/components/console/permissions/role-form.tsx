import {zodResolver} from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  Stack,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type {TFunction} from 'i18next'
import {every, get} from 'lodash-es'
import React from 'react'
import type {Path, SubmitHandler} from 'react-hook-form'
import {useFieldArray, useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import * as z from 'zod'

import {
  FormCheckbox,
  FormTextField,
  Table,
  TableCell,
  TableHeadCell,
} from '@/components'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'

import {accesses} from './permissions-data'

interface RoleFormProps {
  onSubmit: SubmitHandler<RoleFormValues>
  isPending: boolean
}

export const RoleForm: React.FC<RoleFormProps> = ({isPending, onSubmit}) => {
  const {t} = useTranslation('employees')
  const form = useFormContext<RoleFormValues>()

  const {fields} = useFieldArray<RoleFormValues, 'permissions'>({
    control: form.control,
    name: 'permissions',
  })

  const areAllChecked = (fieldName: string): boolean => {
    return every(form.watch().permissions, (field, index) =>
      get(form.getValues(), `permissions.${index}.${fieldName}.value`),
    )
  }

  const toggleCheckAll = (fieldName: string) => () => {
    const allChecked = areAllChecked(fieldName)
    fields.forEach((_, index) => {
      const path =
        `permissions.${index}.${fieldName}.value` as Path<RoleFormValues>
      form.setValue(path, !allChecked)
    })
  }

  return (
    <Card sx={{overflow: 'auto'}}>
      <Stack
        component='form'
        spacing={2}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Typography fontWeight='bold' variant='t1'>
          {t('role-form.role', {defaultValue: 'Role'})}
        </Typography>
        <Stack>
          <FormTextField
            label={t('role-form.role-name', {
              defaultValue: 'Role Name',
            })}
            name='name'
          />
          <FormTextField
            label={t('role-form.role-description', {
              defaultValue: 'Role Description',
            })}
            name='description'
          />
        </Stack>

        <Typography fontWeight='bold' variant='t2'>
          {t('role-form.permissions', {defaultValue: 'Permissions'})}
        </Typography>

        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>
                  {t('role-form.entity', {defaultValue: 'Entity'})}
                </TableHeadCell>

                {accesses.map((access) => {
                  return (
                    <TableHeadCell key={access.name}>
                      <Stack spacing={0.5}>
                        <Typography>{access.label}</Typography>

                        <Typography
                          className='cursor-pointer'
                          sx={{textDecoration: 'underline', minWidth: 84}}
                          onClick={toggleCheckAll(access.name)}
                        >
                          {areAllChecked(access.name)
                            ? t('role-form.uncheck-all', {
                                defaultValue: 'Uncheck All',
                              })
                            : t('role-form.check-all', {
                                defaultValue: 'Check All',
                              })}
                        </Typography>
                      </Stack>
                    </TableHeadCell>
                  )
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {fields.map((resource, index) => {
                return (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>
                      <FormCheckbox name={`permissions.${index}.view.value`} />
                    </TableCell>
                    <TableCell>
                      <FormCheckbox name={`permissions.${index}.add.value`} />
                    </TableCell>
                    <TableCell>
                      <FormCheckbox name={`permissions.${index}.edit.value`} />
                    </TableCell>
                    <TableCell>
                      <FormCheckbox
                        name={`permissions.${index}.delete.value`}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>

        <Button
          disabled={isPending}
          sx={{alignSelf: 'flex-end'}}
          type='submit'
          variant='contained'
        >
          {t('role-form.save', {defaultValue: 'Save'})}
        </Button>
      </Stack>
    </Card>
  )
}

export const getRoleFormSchema = (t: TFunction<'employees'>) =>
  z.object({
    name: makeNormalStringSchema({
      t,
      message: t('role-form.errors.name-invalid', {
        defaultValue: 'Name is incorrect',
      }),
    }),
    description: z.string().min(2, {
      message: t('role-form.errors.description-invalid', {
        defaultValue: 'Description is incorrect',
      }),
    }),
    permissions: z.array(
      z.object({
        name: z.string().min(2, {
          message: t('role-form.errors.permission-name-invalid', {
            defaultValue: 'Name is incorrect',
          }),
        }),
        description: z.string().min(2, {
          message: t('role-form.errors.permission-description-invalid', {
            defaultValue: 'Description is incorrect',
          }),
        }),
        view: z.object({value: z.boolean()}),
        add: z.object({value: z.boolean()}),
        edit: z.object({value: z.boolean()}),
        delete: z.object({value: z.boolean()}),
      }),
    ),
  })

export const getRoleFormResolver = (t: TFunction<'employees'>) =>
  zodResolver(getRoleFormSchema(t))

export type RoleFormValues = z.infer<ReturnType<typeof getRoleFormSchema>>
