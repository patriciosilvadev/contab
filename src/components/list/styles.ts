import styled from 'styled-components'
import theme from '../../styles/theme'

export const TR = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[100]};

  :hover {
    background-color: ${theme.colors.gray[50]};
  }
`
