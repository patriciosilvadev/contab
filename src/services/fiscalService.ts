import Server from './_server'
import { FiscalFindAllProps } from '../config/interfaces/fiscal'

const api = Server.api

class FiscalService {
  /**
   * Function to find all nfs
   */
  public async findAll(params: FiscalFindAllProps): Promise<any> {
    const { data, status } = await api
      .get('nf', { headers: Server.authHeader(), params })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }
}

export default new FiscalService()
