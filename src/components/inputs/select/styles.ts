import theme from '../../../styles/theme'

export const getCustomStyles = props => {
  const { height, width } = props || {}

  return {
    container: provided => ({
      ...provided,
      zIndex: 3,
      ':focus': {
        borderColor: theme.colors.green[100],
        outline: 'none',
        boxShadow: 'none'
      }
    }),
    control: (provided, state) => ({
      ...provided,
      width: width,
      minHeight: height || 50,
      boxShadow: 'none',
      border: `1px solid ${theme.colors.gray[300]}`,
      ':hover': {
        borderColor: state.isFocused
          ? theme.colors.green[100]
          : theme.colors.gray[300]
      }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      let color = data.color
      let background = data.color

      if (isDisabled) {
        color = theme.colors.gray[300]
      } else if (isFocused || isSelected) {
        background = isSelected
          ? theme.colors.green[100]
          : theme.colors.gray[100]
        color = isSelected ? 'white' : theme.colors.green[300]
      }

      return {
        ...styles,
        backgroundColor: background,
        color: color,
        cursor: isDisabled ? 'not-allowed' : isFocused ? 'pointer' : 'default',
        fontWeight: isSelected ? '900' : 'normal',

        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? theme.colors.green[300] : data.color)
        }
      }
    }
  }
}
