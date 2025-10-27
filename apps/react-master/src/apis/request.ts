import axios, { AxiosInstance } from 'axios'

const COMMON_URL = 'http://localhost:3010/api'

const instance: AxiosInstance = axios.create({
  baseURL: COMMON_URL,
  timeout: 1000,
})


instance.interceptors.response .use((res) => {
    console.log('res', res)
    return res.data
},(error) => {
    return Promise.reject(error)
})

export interface IListOpts {
    url: string,
    startNum: number,
    pageSize: number,
    params?: any
}


export const apiGet = ({url, startNum, pageSize,  params}: IListOpts) => {
  return instance.get(`/${url}`, {
    params: {
      startNum,
      pageSize,
      ...params
    }
  })
}