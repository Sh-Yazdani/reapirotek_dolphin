import {
  getGetAllDailyReportsQueryKey,
  getGetAllEmployeesQueryKey,
  getGetAllEquipmentQueryKey,
  getGetAllMaterialsQueryKey,
  getGetAllProjectsQueryKey,
  getGetAllRolesQueryKey,
  getGetAllTasksQueryKey,
} from '@/lib/data-provider/api/__generated'
import {queryClient} from '@/lib/react-query'

export const refetchAllTasks = () => {
  void queryClient.invalidateQueries({queryKey: getGetAllTasksQueryKey()})
}

export const refetchAllEmployees = () => {
  void queryClient.invalidateQueries({queryKey: getGetAllEmployeesQueryKey()})
}

export const refetchAllProjects = () => {
  void queryClient.invalidateQueries({queryKey: getGetAllProjectsQueryKey()})
}

export const refetchAllMaterials = () => {
  void queryClient.refetchQueries({queryKey: getGetAllMaterialsQueryKey()})
}

export const refetchAllEquipment = () => {
  void queryClient.refetchQueries({queryKey: getGetAllEquipmentQueryKey()})
}

export const refetchAllRoles = () => {
  void queryClient.refetchQueries({queryKey: getGetAllRolesQueryKey()})
}

export const refetchAllReports = () => {
  void queryClient.refetchQueries({queryKey: getGetAllDailyReportsQueryKey()})
}
