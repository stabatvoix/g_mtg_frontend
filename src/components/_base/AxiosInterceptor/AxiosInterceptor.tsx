import { ReactElement, useEffect } from 'react'
import Cookie from 'js-cookie'
import { AxiosResponse } from 'axios'
import apiClient from 'src/plugins/apiClient'
import { useNotification } from 'src/components'

export const AxiosInterceptor = ({ children }: { children: ReactElement }) => {
  const { notifyError } = useNotification()

  useEffect(() => {
    apiClient.interceptors.request.use(
      function (request: any) {
        request.headers['X-CSRFToken'] = Cookie.get('csrftoken')
        return request
      },
      function (error: any) {
        return error.response
      }
    )
    // Add a response interceptor
    apiClient.interceptors.response.use(
      // @ts-ignore
      function (response: typeof AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      function (error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error?.response?.status === 500) {
          notifyError({ message: error?.message })
          console.error(error?.response)
        }
        return Promise.reject(error)
      }
    )
  }, [children, notifyError])
  return children
}

AxiosInterceptor.displayName = 'AxiosInterceptor'

export default AxiosInterceptor
