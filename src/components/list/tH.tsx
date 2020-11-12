import React from 'react'
import theme from '../../styles/theme'
import { CSSProperties } from 'styled-components'

const TH: React.FC<CSSProperties> = ({ children, ...rest }) => {
  return (
    <th
      style={{
        ...rest,
        top: 0,
        zIndex: 2,
        padding: 10,
        position: 'sticky',
        borderBottomWidth: 1,
        borderColor: theme.colors.gray[300],
        backgroundColor: theme.colors.gray[100]
      }}
    >
      {children}
    </th>
  )
}

export default TH
