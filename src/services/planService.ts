import { PlanPayload } from '../config/interfaces'
import Server from './_server'

const api = Server.api

class PlanService {
  public async createPlan(payload: PlanPayload): Promise<any> {
    const { data: planCreated, status } = await api
      .post('users/plan', payload, { headers: Server.authHeader() })
      .catch(error => {
        return error.response
      })

    return { planCreated, status }
  }
}

export default new PlanService()
