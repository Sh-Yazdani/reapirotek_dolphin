import {Box, Button, Stack} from '@mui/material'
import {Link, useParams} from '@tanstack/react-router'
import type {TFunction} from 'i18next'
import {Briefcase} from 'iconsax-react'
import {isNil} from 'lodash'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {z} from 'zod'

import {
  BackToLink,
  FormAutoComplete,
  FormSection,
  FormSelect,
  FormTextField,
} from '@/components'
import {useGetAllZonesSuspense} from '@/lib/data-provider/api/__generated'
import {getMeasureUnitOptions, getProjectStatusOptions} from '@/mock/projects'
import {makeNormalStringSchema} from '@/utils/validations/common-fields'
import {projectsStatusSchema} from '@/utils/validations/projects'

const columnGap = 2
const rowGap = 0

const GeneralInformationFormSection = () => {
  const {t} = useTranslation('projects')
  const {data: zones} = useGetAllZonesSuspense()
  const projectId = useParams({strict: false, select: (s) => s.projectId})
  const isEditingProject = !isNil(projectId)
  return (
    <FormSection
      icon={Briefcase}
      title={t('project-form.general-information', {
        defaultValue: 'General Information',
      })}
    >
      <Box
        columnGap={columnGap}
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        rowGap={rowGap}
      >
        <FormTextField
          label={t('project-form.title', {defaultValue: 'Title'})}
          name='title'
        />

        <FormAutoComplete
          label={t('project-form.zone', {defaultValue: 'Zone'})}
          name='zoneId'
          options={zones.map((zone) => ({label: zone.name, value: zone.id!}))}
        />

        <FormTextField
          label={t('project-form.area-length', {defaultValue: 'Area Length'})}
          name='areaLength'
          type='number'
        />
        <FormTextField
          label={t('project-form.area-width', {defaultValue: 'Area Width'})}
          name='areaWidth'
          type='number'
        />
        <FormTextField
          label={t('project-form.area-height', {defaultValue: 'Area Height'})}
          name='areaHeight'
          type='number'
        />
        <FormSelect
          label={t('project-form.measure-unit', {
            defaultValue: 'Measure Unit',
          })}
          name='measureUnit'
          options={getMeasureUnitOptions(t)}
        />
        <FormTextField
          label={t('project-form.latitude', {defaultValue: 'Latitude'})}
          name='latitude'
          type='number'
        />
        <FormTextField
          label={t('project-form.longitude', {defaultValue: 'Longitude'})}
          name='longitude'
          type='number'
        />

        {isEditingProject ? (
          <FormSelect
            label={t('project-form.status', {defaultValue: 'Status'})}
            name='status'
            options={getProjectStatusOptions(t)}
          />
        ) : null}

        <Box gridColumn='1/-1'>
          <FormTextField
            label={t('project-form.description', {
              defaultValue: 'Description',
            })}
            name='description'
            rows={2}
            multiline
          />
        </Box>
      </Box>
    </FormSection>
  )
}

const latitudeValidation = z.coerce
  .number()
  .gte(-90, {message: 'Latitude is incorrect'})
  .lte(90, {message: 'Latitude is incorrect'})

const longitudeValidation = z.coerce
  .number()
  .gte(-180, {message: 'Longitude is incorrect'})
  .lte(180, {message: 'Longitude is incorrect'})

export const getProjectFormSchema = (t: TFunction<'form' | 'projects'>) =>
  z.object({
    title: makeNormalStringSchema({
      t,
      message: t('project-form.errors.title-invalid', {
        defaultValue: 'Title is incorrect',
      }),
    }),
    zoneId: z.string().min(2, {
      message: t('project-form.errors.zone-id-invalid', {
        defaultValue: 'Zone ID is incorrect',
      }),
    }),
    areaLength: z.coerce.number().min(1, {
      message: t('project-form.errors.area-length-invalid', {
        defaultValue: 'Area length is incorrect',
      }),
    }),
    areaWidth: z.coerce.number().min(1, {
      message: t('project-form.errors.area-width-invalid', {
        defaultValue: 'Area width is incorrect',
      }),
    }),
    areaHeight: z.coerce.number().min(1, {
      message: t('project-form.errors.area-height-invalid', {
        defaultValue: 'Area height is incorrect',
      }),
    }),
    latitude: latitudeValidation,
    longitude: longitudeValidation,
    status: projectsStatusSchema.optional(),
    description: z.string().optional(),
    measureUnit: z.string().optional(),
  })

export type ProjectFormValues = z.infer<ReturnType<typeof getProjectFormSchema>>

interface ProjectFormFooterProps extends CommonProjectFormProps {}

const ProjectFormFooter: React.FC<ProjectFormFooterProps> = ({
  isEdit,
  isPending,
}) => {
  const {t} = useTranslation('projects')
  return (
    <Stack
      alignItems='center'
      direction={{xs: 'column', md: 'row'}}
      justifyContent='flex-end'
      spacing={3}
    >
      <Link to='/console/projects/operations'>
        <BackToLink
          caption={t('project-form.back-to-projects-list', {
            defaultValue: 'Back to Projects list',
          })}
          fontWeight='regular'
          underline={false}
        />
      </Link>
      <Button
        disabled={isPending}
        size='large'
        sx={{width: 280, height: 52}}
        type='submit'
        variant='contained'
      >
        {isEdit
          ? t('project-form.save-project', {defaultValue: 'Save project'})
          : t('project-form.add-project', {defaultValue: 'Add project'})}
      </Button>
    </Stack>
  )
}

interface CommonProjectFormProps {
  isEdit: boolean
  isPending: boolean
}

interface ProjectFormProps extends CommonProjectFormProps {
  onSubmit: SubmitHandler<ProjectFormValues>
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  isEdit,
  isPending,
  onSubmit,
}) => {
  const form = useFormContext<ProjectFormValues>()
  return (
    <Stack component='form' spacing={2} onSubmit={form.handleSubmit(onSubmit)}>
      <GeneralInformationFormSection />
      <ProjectFormFooter isEdit={isEdit} isPending={isPending} />
    </Stack>
  )
}
