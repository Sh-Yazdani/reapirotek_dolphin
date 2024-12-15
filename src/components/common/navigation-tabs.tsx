import type {TabsProps} from '@mui/material'
import {Tab, Tabs} from '@mui/material'
import type {ParsedLocation} from '@tanstack/react-router'
import {Link, useLocation} from '@tanstack/react-router'
import {orderBy} from 'lodash-es'
import type {ElementType, FC, ReactNode} from 'react'

export interface NavigationTab {
  label: ReactNode
  value: string
  index?: number
}

export const getCurrentTabValue = (
  tabs: NavigationTab[],
  location: ParsedLocation,
) => {
  // eslint-disable-next-line fp/no-let
  let closestMatchingTab = null
  // eslint-disable-next-line fp/no-let
  let longestMatchingPrefixLength = 0

  tabs.forEach((tab) => {
    if (
      location.pathname.startsWith(tab.value) &&
      tab.value.length > longestMatchingPrefixLength
    ) {
      closestMatchingTab = tab.value
      longestMatchingPrefixLength = tab.value.length
    }
  })

  return closestMatchingTab
}

interface NavigationTabsProps<T extends NavigationTab> {
  tabs: T[]
  a11yProps: (index: number) => {id: string; 'aria-controls': string}
  tabsProps?: TabsProps
}

export const NavigationTabs = <T extends NavigationTab>({
  a11yProps,
  tabs,
  tabsProps,
}: NavigationTabsProps<T>) => {
  const location = useLocation()
  const currentTabValue = getCurrentTabValue(tabs, location)

  return (
    <Tabs
      scrollButtons={false}
      value={currentTabValue}
      variant='scrollable'
      {...tabsProps}
    >
      {orderBy(tabs, 'index').map((tab, index) => {
        return (
          <Tab<ElementType<typeof Link>>
            key={index}
            label={tab.label}
            LinkComponent={Link as unknown as FC<HTMLAnchorElement>}
            /* @ts-ignore TODO-> Fix this :/ */
            to={tab.value}
            value={tab.value}
            {...a11yProps(index)}
          />
        )
      })}
    </Tabs>
  )
}
