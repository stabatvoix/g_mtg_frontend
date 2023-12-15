import apiClient from 'src/plugins/apiClient'
import { AxiosResponse } from 'src/services/base/types'
import { addTrailingSlashToUrl } from 'src/services/helpers/addTrailingSlashToUrl'

export interface AxiosRequestConfig {
  [key: string]: any
}

export default class BaseServices {
  static async fetch(url: string, filter?: any, config?: AxiosRequestConfig) {
    try {
      return await apiClient.get(addTrailingSlashToUrl(url), {
        params: { ...filter },
        ...config,
      })
    } catch (e) {
      return e
    }
  }

  static fetchOne(
    url: string,
    id: string | number | undefined,
    filter?: any
  ): any {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`${addTrailingSlashToUrl(url)}${id ? id + '/' : ''}`, {
          params: { ...filter },
        })
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static create(url: string, data: any, options: object): any {
    return new Promise((resolve, reject) => {
      apiClient
        .post(addTrailingSlashToUrl(url), data, options)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static update(
    url: string,
    id: string | number | undefined,
    fields: any,
    options: AxiosRequestConfig = {}
  ): any {
    return new Promise((resolve, reject) => {
      apiClient
        .patch(`${addTrailingSlashToUrl(url)}${id}/`, fields, options)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static delete(url: string, id: string | number): any {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`${addTrailingSlashToUrl(url)}${id}/`)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static deleteExtra(url: string): any {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(url)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static fetchExtra(url: string, filter?: Record<string, any>): any {
    return new Promise((resolve, reject) => {
      apiClient
        .get(addTrailingSlashToUrl(url), { params: { ...filter } })
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static postExtra(url: string, fields?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(addTrailingSlashToUrl(url), fields)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static patchExtra(url: string, fields?: any): any {
    return new Promise((resolve, reject) => {
      apiClient
        .patch(addTrailingSlashToUrl(url), fields)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }

  static putExtra(url: string, fields?: any): any {
    return new Promise((resolve, reject) => {
      apiClient
        .put(addTrailingSlashToUrl(url), fields)
        .then((response: AxiosResponse) => {
          return resolve(response)
        })
        .catch((error: any) => {
          return reject(error)
        })
    })
  }
}
