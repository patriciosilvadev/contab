import { FormValidation, User } from '../config/interfaces'
import Server from './_server'

interface UserAuth {
  email: string
  password: string
}

interface UserPost {
  name: string
  role: string
  email: string
  password: string
  cellphone: string
}

const api = Server.api

class UserService {
  /**
   * Function to validate user data and return a validate form
   *
   * @param user entity to valudate
   */
  public isValidatedForm(user: User, isEdit?: boolean) {
    const cellphoneRegex = /^\d{11}$/
    const newValidation: FormValidation = {} as FormValidation

    newValidation.addressCepIsValid = true
    newValidation.nameIsValid = !!user.name.trim()
    newValidation.roleIsValid = !!user.role.trim()
    newValidation.emailIsValid = !!user.email.trim()
    newValidation.celphoneIsValid =
      !!user.celphone.trim() && cellphoneRegex.test(user.celphone)
    newValidation.passwordIsValid = user.password
      ? !!user.password.trim()
      : true

    if (isEdit) {
      newValidation.cnpjIsValid = !!user.cnpj?.trim()
      newValidation.razaoIsValid = !!user.razaoSocial?.trim()
      newValidation.addressCityIsValid = !!user.address?.city?.trim()
      newValidation.addressStateIsValid = !!user.address?.state?.trim()

      newValidation.certificatePassIsValid = user.certificate
        ? !!user.certificatePass?.trim()
        : true
    }

    const isValid =
      newValidation.nameIsValid &&
      newValidation.roleIsValid &&
      newValidation.emailIsValid &&
      newValidation.celphoneIsValid &&
      (user.password ? newValidation.passwordIsValid : true) &&
      (isEdit
        ? newValidation.cnpjIsValid &&
          newValidation.razaoIsValid &&
          newValidation.addressCityIsValid &&
          newValidation.addressStateIsValid &&
          newValidation.certificatePassIsValid
        : true)

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
