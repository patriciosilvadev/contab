import Server from './_server'
import { FindAllProps } from '../config/interfaces/list'
import { Category, CategoryValidation } from '../config/interfaces/category'

const api = Server.api

class CategoryService {
  /**
   * Function to validate category data and return a validate form
   *
   * @param category entity to validate
   */
  public isValidatedForm(category: Category) {
    const newValidation: CategoryValidation = {} as CategoryValidation

    newValidation.nameIsValid = !!category?.name?.trim()

    return { isValid: newValidation.nameIsValid, newValidation }
  }

  /**
   * Function to find all categories
   */
  public async findAll(params: FindAllProps): Promise<any> {
    const { data, status } = await api
      .get('categories', { headers: Server.authHeader(), params })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to create a new category
   *
   * @param payload category inforamtion
   */
  public async create(payload: Category): Promise<any> {
    const { data, status } = await api
      .post('categories', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to edit a category
   *
   * @param payload category inforamtion
   */
  public async update(payload: Category): Promise<any> {
    const { data, status } = await api
      .put('categories', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }

  /**
   * Function to delete a category
   *
   * @param payload category inforamtion
   */
  public async delete(payloadId: number): Promise<any> {
    const { data, status } = await api
      .delete('categories', {
        headers: Server.authHeader(),
        params: { id: payloadId }
      })
      .catch(error => {
        return error.response
      })

    return { data, status }
  }
}

export default new CategoryService()
