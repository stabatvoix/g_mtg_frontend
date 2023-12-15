import axios from 'axios'
import Qs from 'qs'
import { getConfig } from 'src/utils/getConfig'
import { BASIC_AUTH_STORAGE_KEY } from 'src/services/auth/AuthServices'

const config = {
  baseURL: `${getConfig('VITE_SERVER_URL')}/api`,
  timeout: 30000,
  withCredentials: true,
  paramsSerializer: function (params: any) {
    return Qs.stringify(params, { indices: false })
  },
  headers: {
    Authorization:
      `Basic ${localStorage.getItem(BASIC_AUTH_STORAGE_KEY)}` || undefined,
  },
}
const apiClient = axios.create({
  ...config,
})

export default apiClient
