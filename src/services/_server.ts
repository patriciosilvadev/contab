import axios, { AxiosInstance } from 'axios'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const urls = {
  test: 'http://localhost:3334',
  development: 'http://localhost:3333/',
  production: 'https://your-production-url.com/'
}

class Server {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: urls.development
    })
  }

  public setAuthCookie(token: string) {
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
  }

  public removeAuthCookie() {
    destroyCookie(null, 'token')
  }

  public authHeader(tokenParam?) {
    const cookies = parseCookies()
    return { Authorization: cookies?.token || tokenParam }
  }
}

export default new Server()
