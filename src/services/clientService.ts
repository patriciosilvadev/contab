import constants from '../config/constants'
import { FindAllProps } from '../config/interfaces/list'
import { Person, PersonValidation } from '../config/interfaces/person'
import Server from './_server'

const api = Server.api

class ClientService {
  /**
   * Function to validate user data and return a validate form
   *
   * @param client entity to valudate
   */
  public isValidatedForm(client: Person) {
    const newValidation: PersonValidation = {} as PersonValidation

    newValidation.nameIsValid = !!client?.name?.trim()
    newValidation.inscEstadualIsValid =
      client.indInscEstadual === constants.IND_INSCR_SOCIAL_Y
        ? !!client?.inscEstadual?.trim()
        : true

    return {
      isValid: newValidation.nameIsValid && newValidation.inscEstadualIsValid,
      newValidation
    }
  }

  /**
   * Function to find all clients
   */
  public async findAll(params: FindAllProps): Promise<any> {
    const { data, status } = await api
      .get('clients', { headers: Server.authHeader(), params })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to create a new client
   *
   * @param payload client inforamtion
   */
  public async create(payload: Person): Promise<any> {
    const { data, status } = await api
      .post('clients', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to edit a client
   *
   * @param payload client inforamtion
   */
  public async update(payload: Person): Promise<any> {
    const { data, status } = await api
      .put('clients', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to toggle active flag
   *
   * @param payload client inforamtion
   */
  public async toggleActive(payload: Person): Promise<any> {
    const { status } = await api
      .put(
        'clients/toggleActive',
        { id: payload.id },
        { headers: Server.authHeader() }
      )
      .catch(error => {
        return error.response
      })

    return { status }
  }
}

export default new ClientService()
