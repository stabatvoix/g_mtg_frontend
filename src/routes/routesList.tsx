import { ReactNode } from 'react'
import { ProjectsRoutes } from 'src/routes/projectsRoutes'
import { StatisticsRoutes } from 'src/routes/statisticsRoutes'
import { GenaRoutes } from 'src/routes/genaRoutes'
import { UsersRoutes } from 'src/routes/usersRoutes'

export interface Link {
  title: string
  to: string
  component: ReactNode
  icon: ReactNode
  isNavLink: boolean
  childrenList?: Link[]
}

/**
 * Список роутов
 */
export const RoutesList: () => any[] = () => {
  return [
    ...ProjectsRoutes(),
    ...StatisticsRoutes(),
    ...GenaRoutes(),
    ...UsersRoutes(),
  ]
}
