import axios from 'axios'
import Qs from 'qs'
import { getConfig } from 'src/utils/getConfig'


const config = {
  baseURL: `${getConfig('VITE_SERVER_URL')}/api`,
  timeout: 30000,
  withCredentials: true,
  paramsSerializer: function (params: any) {
    return Qs.stringify(params, { indices: false })
  },
}
const apiClient = axios.create({
  ...config,
})

export default apiClient
