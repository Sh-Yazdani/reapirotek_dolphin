import type {MongoAbility} from '@casl/ability'
import {defineAbility} from '@casl/ability'
import {createContextualCan, useAbility} from '@casl/react'
import type {ReactNode} from 'react'
import {createContext} from 'react'
import {useUpdate} from 'react-use'
import {useDeepCompareMemo} from 'use-deep-compare'
import {useShallow} from 'zustand/react/shallow'

import {useAuthenticationStore} from '@/store/auth'

export type UserRole = string | 'Admin' | 'user'

export type UserPermissions = Partial<Record<Subjects, Actions[]>>

export const permissionsMap: Record<UserRole, Partial<UserPermissions>> = {
  Admin: {
    all: ['manage'],
  },
  User: {
    tasks: ['read'],
    dailyLogs: ['read'],
    timeCard: ['read'],
    projects: ['read'],
    reports: ['read', 'add'],
  },
}

export type Actions = 'add' | 'delete' | 'edit' | 'export' | 'manage' | 'read'
export type Subjects =
  | 'all'
  | 'dailyLogs'
  | 'employeeAccidentReports'
  | 'employees'
  | 'equipment'
  | 'equipmentDamageReports'
  | 'materials'
  | 'profile'
  | 'projectGallery'
  | 'projects'
  | 'reports'
  | 'tasks'
  | 'timeCard'

export type AbilityContextValue = MongoAbility<[Actions, Subjects]>

const AbilityContext = createContext<AbilityContextValue>(undefined!)

export const defaultNoAccessCallbackUrl = '/console/dashboard'
export const useAbilityContext = () => useAbility(AbilityContext)

export const Can = createContextualCan(AbilityContext.Consumer)

interface AccessProviderProps {
  children: ReactNode
}

/**
 * 
 * @example output => const example = [
  {
    action: 'read',
    subjects: [
      'dashboard',
      'tasks',
      'dailyLogs',
      'projects',
      'reports',
      'settings',
      'profile',
    ],
  },
  {
    action: 'add',
    subjects: ['reports'],
  },
]

 * @param rolePermissions 
 * @returns 
 */

function organizePermissions(
  rolePermissions: UserPermissions,
): {action: Actions; subjects: Subjects[]}[] {
  const actionMap: Partial<Record<Actions, Subjects[]>> = {}

  // Iterate through the permissions and organize them by action
  // eslint-disable-next-line fp/no-loops
  for (const [subject, actions] of Object.entries(rolePermissions)) {
    actions.forEach((action) => {
      if (!actionMap[action]) {
        actionMap[action] = []
      }
      actionMap[action].push(subject as Subjects)
    })
  }

  // Convert the actionMap to the desired output format
  const result = Object.entries(actionMap).map(([action, subjects]) => ({
    action: action as Actions,
    subjects,
  }))

  return result
}

const useAbilityValue = () => {
  const update = useUpdate()

  const {permissions} = useAuthenticationStore(
    useShallow((s) => ({
      permissions: s.user?.permissions,
    })),
  )

  const initializer = () => {
    const abilityValue = defineAbility<AbilityContextValue>((can) => {
      if (!permissions) return
      const rulesMap = organizePermissions(permissions)

      rulesMap.forEach(({action, subjects}) => {
        can(action, subjects)
      })
    })

    abilityValue.on('update', update)

    return abilityValue
  }

  const ability = useDeepCompareMemo(initializer, [permissions])

  return ability
}

export const AccessProvider: React.FC<AccessProviderProps> = ({children}) => {
  const ability = useAbilityValue()

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}
