import styled from 'styled-components'
import theme from '../../styles/theme'

export const PaginationContent = styled.div`
  display: flex;
  flex-direction: row;

  .pagination {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    li {
      display: flex;
      flex-direction: row;

      &.disabled {
        a {
          opacity: 0.3;
          cursor: not-allowed;

          :hover {
            background-color: transparent;
          }
        }
      }

      &.active {
        a {
          font-weight: bold;
          color: white;
          background-color: ${theme.colors.green[300]};

          :hover {
            background-color: ${theme.colors.green[100]};
          }
        }
      }

      a {
        display: flex;
        width: 35px;
        height: 35px;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: ${theme.colors.gray[600]};
        transition: all 0.2s;

        :hover {
          font-weight: bold;
          background-color: ${theme.colors.gray[100]};
        }

        :active,
        :focus {
          outline: none;
        }
      }
    }
  }
`
