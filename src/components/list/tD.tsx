import React from 'react'

const TD: React.FC = ({ children, ...rest }) => {
  return (
    <td style={{ padding: 10, fontSize: 14 }} {...rest}>
      {children}
    </td>
  )
}

export default TD
