import React, { createContext, useMemo } from 'react'
import { FCC } from 'src/types'
import { useUserGetInfo } from 'src/services/auth/hooks'
import { ProfilesModelProps } from 'src/models'
import { getFromLocalStorage } from 'src/hooks'

interface CurrentUserProviderProps {
  currentUserInfo?: ProfilesModelProps
  currentUserRoles?: Map<string, string[]>
  isAuthorized?: boolean
  isLoading?: boolean
}

export const CurrentUserContext = createContext<CurrentUserProviderProps>(
  {} as CurrentUserProviderProps
)

export const CurrentUserProvider: FCC<CurrentUserProviderProps> = ({
  children,
}) => {
  const { data, isLoading }: { data: any; isLoading: boolean } = useUserGetInfo(
    {
      refetchOnWindowFocus: false,
    }
  )
  const login = localStorage.getItem('login')
  const password = localStorage.getItem('password')
  const isAuthorized = useMemo(
    () => Boolean(login && password),
    [login, password]
  )

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserInfo: data?.data,
        isAuthorized: isAuthorized,
        isLoading,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}

CurrentUserProvider.displayName = 'CurrentUserProvider'

export default CurrentUserProvider
