import React from 'react'

import constants from '../../config/constants'
import PersonIndex from '../../components/person'
import { ProtectRoute } from '../../hooks/authContext'
import supplierService from '../../services/supplierService'

const Suppliers: React.FC = () => {
  return (
    <PersonIndex
      type={constants.PERSON_TYPE_SUPPLIER}
      service={supplierService}
    />
  )
}

export default ProtectRoute(Suppliers)
