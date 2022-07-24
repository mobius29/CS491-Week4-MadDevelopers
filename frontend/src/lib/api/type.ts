import client from './client'

export const getCodes = (lang: string) => client.get(`/game/${lang}`)
