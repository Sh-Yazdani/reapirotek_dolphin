import React, {Fragment, memo} from 'react'
import type {HelmetProps} from 'react-helmet-async'
import {Helmet as OriginalHelmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'

export const Helmet: React.FC<HelmetProps> = (props) => {
  const {i18n} = useTranslation()
  return (
    <OriginalHelmet
      defaultTitle='Repairo Tek'
      htmlAttributes={{lang: i18n.language}}
      titleTemplate='%s | Repairo Tek'
      {...props}
    />
  )
}

export function withHelmet<T extends object>(
  Component: React.ComponentType<T>,
  title: string,
) {
  return memo((props: T): React.JSX.Element => {
    return (
      <Fragment>
        <Helmet title={title} />
        <Component {...props} />
      </Fragment>
    )
  })
}
