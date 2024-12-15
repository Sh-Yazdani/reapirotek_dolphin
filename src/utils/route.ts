enum DashboardUrls {
  User = '/console/dashboard',
  Operator = '/operator/dashboard',
}

export const createNextUrlBasedOnRole = (role?: string) => {
  const nextUrl =
    role === 'Operator' ? DashboardUrls.Operator : DashboardUrls.User
  return nextUrl
}
