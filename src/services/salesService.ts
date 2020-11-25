import Server from './_server'
import { FindAllProps } from '../config/interfaces/list'

const api = Server.api

class SalesService {
  /**
   * Function to find all products
   */
  public async findAll(params: FindAllProps): Promise<any> {
    const { data, status } = await api
      .get('sales', { headers: Server.authHeader(), params })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to find all products
   */
  public async findProducts(saleId: number): Promise<any> {
    const { data, status } = await api
      .get(`sales/${saleId}/products`, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to create a new product
   *
   * @param payload product inforamtion
   */
  public async create(payload: any): Promise<any> {
    const { data, status } = await api
      .post('sales', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to delete a sale
   *
   * @param payload sale inforamtion
   */
  public async delete(payloadId: number): Promise<any> {
    const { data, status } = await api
      .delete('sales', {
        headers: Server.authHeader(),
        params: { id: payloadId }
      })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to delete a lot of sales
   *
   * @param payload sale inforamtion
   */
  public async batchDelete(ids: number[]): Promise<any> {
    const { data, status } = await api
      .delete('sales/batch', {
        headers: Server.authHeader(),
        params: { ids: ids }
      })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }
}

export default new SalesService()
