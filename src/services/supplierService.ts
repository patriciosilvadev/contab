import constants from '../config/constants'
import { FindAllProps } from '../config/interfaces/list'
import { Person, PersonValidation } from '../config/interfaces/person'
import Server from './_server'

const api = Server.api

class SupplierService {
  /**
   * Function to validate user data and return a validate form
   *
   * @param supplier entity to valudate
   */
  public isValidatedForm(supplier: Person) {
    const newValidation: PersonValidation = {} as PersonValidation

    newValidation.nameIsValid = !!supplier?.name?.trim()
    newValidation.inscEstadualIsValid =
      supplier.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
        ? !!supplier?.inscEstadual?.trim()
        : true

    return {
      isValid: newValidation.nameIsValid && newValidation.inscEstadualIsValid,
      newValidation
    }
  }

  /**
   * Function to find all suppliers
   */
  public async findAll(params: FindAllProps): Promise<any> {
    const { data, status } = await api
      .get('suppliers', { headers: Server.authHeader(), params })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to create a new supplier
   *
   * @param payload supplier inforamtion
   */
  public async create(payload: Person): Promise<any> {
    const { data, status } = await api
      .post('suppliers', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { ...data, status }
  }

  /**
   * Function to edit a supplier
   *
   * @param payload supplier inforamtion
   */
  public async update(payload: Person): Promise<any> {
    const { data, status } = await api
      .put('suppliers', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { ...data, status }
  }

  /**
   * Function to toggle active flag
   *
   * @param payload supplier inforamtion
   */
  public async toggleActive(payload: Person): Promise<any> {
    const { data, status } = await api
      .put(
        'suppliers/toggleActive',
        { id: payload.id },
        { headers: Server.authHeader() }
      )
      .catch(error => {
        return error.response
      })

    return { ...data, status }
  }
}

export default new SupplierService()
