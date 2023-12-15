import { useState } from 'react'
import BaseServices from 'src/services/base/BaseServices'

/**
 * Хук для скачивания файлов
 */
export const useFileDownload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const fileDownload = async ({
    url,
    params,
    name,
  }: {
    url: string
    params?: any
    name: string
  }) => {
    setIsLoading(true)
    try {
      if (url.startsWith('http')) {
        window.open(url)
        return
      }
      const res = await BaseServices.fetch(
        url,
        { ...params },
        {
          responseType: 'arraybuffer',
        }
      )
      const contentType = res.headers['content-type']
        ? res.headers['content-type']
        : 'application/pdf'
      const newBlob = new Blob([res.data], {
        type: contentType,
      })
      const link = document.createElement('a')
      link.download = name
      const data = window.URL.createObjectURL(newBlob)
      link.href = data
      link.download = name
      link.target = '_blank'
      link.click()
      document.body.appendChild(link)
      setTimeout(function () {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(data)
      }, 200)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { fileDownload, isLoading }
}
