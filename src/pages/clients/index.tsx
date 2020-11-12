import React from 'react'

import constants from '../../config/constants'
import PersonIndex from '../../components/person'
import { ProtectRoute } from '../../hooks/authContext'
import clientService from '../../services/clientService'

const Clients: React.FC = () => {
  return <PersonIndex type={constants.TYPE_CLIENT} service={clientService} />
}

export default ProtectRoute(Clients)
