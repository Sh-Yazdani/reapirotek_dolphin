import {useEventCallback} from '@mui/material'
import dayjs from 'dayjs'
import {produce} from 'immer'
import {assign} from 'lodash-es'
import {useEffect, useState} from 'react'

import Profile1 from '@/assets/images/profiles/profile-1.jpg'
import {generateFilePreview} from '@/components'
import type {Employee} from '@/lib/data-provider/api/__generated'

import type {EditProfileFormValues} from './profile-form'

const fileURL = Profile1

/* TODO -> abstract this */
export const useTransformProfileDataToFormValues = (employee?: Employee) => {
  const [isLoading, setIsLoading] = useState(true)
  const [formValues, setFormValues] = useState<EditProfileFormValues>()

  const transformReportToFormValues = useEventCallback(() => {
    void fetch(fileURL)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'image.jpg', {
          type: 'image/jpeg',
        })

        // eslint-disable-next-line fp/no-mutating-assign
        const profilePhoto = Object.assign(file, {
          preview: generateFilePreview(file),
        })

        // Use the file as needed, e.g., upload it or read it with FileReader

        const transformedValues = produce(employee, (draft) => {
          /*  */
          assign(draft, {
            dateOfBirth: dayjs(employee?.dateOfBirth),
          })
        })

        setFormValues({
          ...transformedValues,
          profilePhoto: [profilePhoto],
        } as unknown as EditProfileFormValues)
        setIsLoading(false)
      })
  })

  useEffect(() => {
    transformReportToFormValues()
  }, [employee, transformReportToFormValues])

  return {isLoading, formValues}
}
