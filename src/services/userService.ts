import { FormValidation, User } from '../config/interfaces'
import Server from './_server'

interface UserAuth {
  email: string
  password: string
}

interface UserPost {
  name: string
  email: string
  cellphone: string
  password: string
  role: string
}

const api = Server.api

class UserService {
  /**
   * Function to validate user data and return a validate form
   *
   * @param user entity to valudate
   */
  public isValidatedForm(user) {
    const cellphoneRegex = /^\d{11}$/
    const newValidation: FormValidation = {} as FormValidation

    newValidation.nameIsValid = !!user.name.trim()
    newValidation.emailIsValid = !!user.email.trim()
    newValidation.cellphoneIsValid =
      !!user.cellphone.trim() && cellphoneRegex.test(user.cellphone)
    newValidation.roleIsValid = !!user.role.trim()

    if (user.password) {
      newValidation.passwordIsValid = !!user.password.trim()
    }

    const isValid =
      newValidation.nameIsValid &&
      newValidation.emailIsValid &&
      newValidation.cellphoneIsValid &&
      (user.password ? newValidation.passwordIsValid : true) &&
      newValidation.roleIsValid

    return { isValid, newValidation }
  }

  /**
   * Function to get user information
   *
   * @param token string to identify user
   */
  public async me(token?): Promise<any> {
    const { data, status } = await api
      .get('users/me', {
        headers: Server.authHeader(token)
      })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to authenticate user
   *
   * @param payload data to validate user information
   */
  public async signIn(payload: UserAuth): Promise<any> {
    const { data, status } = await api
      .get('users/auth', {
        auth: {
          username: payload.email,
          password: payload.password
        }
      })
      .catch(error => {
        return error.response
      })

    if (data?.token) {
      Server.setAuthCookie(data.token)
    }

    return { ...data, status }
  }

  /**
   * Function to create a new user
   *
   * @param payload user inforamtion
   */
  public async signUp(payload: UserPost): Promise<any> {
    const { data, status } = await api.post('users', payload).catch(error => {
      return error.response
    })

    if (data?.token) {
      Server.setAuthCookie(data.token)
    }

    return { ...data, status }
  }

  /**
   * Function to edit an user
   *
   * @param payload user inforamtion
   */
  public async edit(payload: User): Promise<any> {
    const { data, status } = await api
      .put('users', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function call endpoint to request a reset password
   *
   * @param email user email to receive a reset password form link
   */
  public async requestResetPasswod(email: string): Promise<any> {
    const { data, status } = await api
      .post('users/forgot/password', { email })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function call endpoint to reset password
   *
   * @param token user token to autheticate user
   * @param password new passowrd to reset
   */
  public async resetPasswod(token: string, password: string): Promise<any> {
    const { data, status } = await api
      .post('users/reset/password', { token, password })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }
}

export default new UserService()
