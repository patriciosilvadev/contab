import useSWR from 'swr'
import Server from '../services/_server'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await Server.api.get(url)

    return response.data
  })

  return { data, error, mutate }
}
