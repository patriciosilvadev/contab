import Server from './_server'
import { FindAllProps } from '../config/interfaces/list'
import { Product, ProductValidation } from '../config/interfaces/product'

const api = Server.api

class ProductService {
  /**
   * Function to validate product data and return a validate form
   *
   * @param product entity to validate
   */
  public isValidatedForm(product: Product) {
    const newValidation: ProductValidation = {} as ProductValidation

    newValidation.nameIsValid = !!product?.name?.trim()

    return { isValid: newValidation.nameIsValid, newValidation }
  }

  /**
   * Function to find all products
   */
  public async findAll(params: FindAllProps): Promise<any> {
    const { data, status } = await api
      .get('products', { headers: Server.authHeader(), params })
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
  public async create(payload: Product): Promise<any> {
    const { data, status } = await api
      .post('products', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to edit a product
   *
   * @param payload product inforamtion
   */
  public async update(payload: Product): Promise<any> {
    const { data, status } = await api
      .put('products', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to delete a product
   *
   * @param payload product inforamtion
   */
  public async delete(payloadId: number): Promise<any> {
    const { data, status } = await api
      .delete('products', {
        headers: Server.authHeader(),
        params: { id: payloadId }
      })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }
}

export default new ProductService()
