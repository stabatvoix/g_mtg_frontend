import apiClient from 'src/plugins/apiClient'
import {
  LoginValuesTypes,
  SetPasswordValuesTypes,
} from 'src/services/auth/types'

const userApi = 'user/users'

export const BASIC_AUTH_STORAGE_KEY = 'auth'
export const USER_STORAGE_KEY = 'user'

export default class AuthServices {
  static login(url: string, credentials?: LoginValuesTypes, options?: any) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`${userApi}/${url}/`, { ...credentials }, options)
        .then((response: any) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error.response)
        })
    })
  }
  /**
   * Получаем с бэка информацию о текущем пользователе
   */
  static async getUserInfo() {
    try {
      const res = await apiClient.get(`${userApi}/get-info/`)
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }
      return res
    } catch (error: any) {
      return error.data
    }
  }
  /**
   * Регистрируем пользователя
   * @param username
   * @param email
   */
  static register({ username, email }: any) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`${userApi}/register/`, { username, email })
        .then((response: any) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error.response)
        })
    })
  }
  /**
   * Устанавливаем пароль для пользователя
   * @param SetPasswordValuesTypes
   * @param url
   */
  static setPasswords(
    { password1, password2, extraPath }: SetPasswordValuesTypes,
    url = 'recover-password'
  ) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`${userApi}/${url}/${extraPath}/`, {
          password1,
          password2,
        })
        .then((response: any) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static forgot({ email }: any) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`${userApi}/send-email-recover-password/`, { email })
        .then((response: any) => {
          return resolve(response.data)
        })
        .catch((error: any) => {
          return reject(error.response.data)
        })
    })
  }
  /**
   * Разлогиниваем пользователя
   */
  static logout(url: string) {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`${userApi}/${url}/`, {})
        .then((response: any) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error.data)
        })
    })
  }
}
