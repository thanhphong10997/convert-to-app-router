'use client'

// Mui
import { styled, TextField, TextFieldProps } from '@mui/material'

export const CustomTextField = (props: TextFieldProps) => {
  const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    return {
      '& .MuiInputLabel-root': {
        transform: 'none',
        lineHeight: 1.2,
        position: 'relative',
        marginBottom: theme.spacing(1),
        fontSize: theme.typography.body2?.fontSize
      },

      '& .MuiInputBase-root': {
        borderRadius: 8,
        backgroundColor: 'transparent',
        border: `1px solid rgba(${theme.palette.customColors?.borderColor},0.2)`,
        transition: theme.transitions?.create(['border-color', 'box-shadow']),
        duration: theme.transitions.duration?.shorter,

        '&:before, &:after': {
          display: 'none'
        },
        '.MuiInputBase-input': {
          padding: '8px 10px'
        },
        '&.Mui-error': {
          borderColor: theme.palette.error?.main
        },
        '& .MuiFormHelperText-root': {
          lineHeight: 1.154,
          margin: theme.spacing(1, 0, 0),
          color: theme.palette.text?.secondary,
          fontSize: theme.typography.body2?.fontSize,
          '&.Mui-error': {
            color: theme.palette.error?.main
          }
        }
      },
      '.MuiInputBase-colorPrimary': {
        color: theme.palette.primary?.main,
        borderColor: theme.palette.primary?.main
      },
      '.MuiInputBase-colorSecondary': {
        color: theme.palette.secondary?.main,
        borderColor: theme.palette.secondary?.main
      },
      '.MuiInputBase-colorError': {
        color: theme.palette.error?.main,
        borderColor: theme.palette.error?.main
      },
      '.MuiInputBase-colorInfo': {
        color: theme.palette.info?.main,
        borderColor: theme.palette.info?.main
      },
      '.MuiInputBase-colorSuccess': {
        color: theme.palette.success?.main,
        borderColor: theme.palette.success?.main
      },
      '.MuiInputBase-colorWarning': {
        color: theme.palette.warning?.main,
        borderColor: theme.palette.warning?.main
      },
      '.MuiFilledInput-root.MuiInputBase-colorError': {
        backgroundColor: theme.palette.error?.main,
        color: theme.palette.common.white
      },
      '.MuiFilledInput-root.MuiInputBase-colorSuccess': {
        backgroundColor: theme.palette.success?.main,
        color: theme.palette.common.white
      },
      '.MuiFilledInput-root.MuiInputBase-colorWarning': {
        backgroundColor: theme.palette.warning?.main,
        color: theme.palette.common.white
      },
      '.MuiFilledInput-root.MuiInputBase-colorPrimary': {
        backgroundColor: theme.palette.primary?.main,
        color: theme.palette.common.white
      },
      '.MuiFilledInput-root.MuiInputBase-colorSecondary': {
        backgroundColor: theme.palette.secondary?.main,
        color: theme.palette.common.white
      }
    }
  })

  const { size = 'small', variant = 'filled', InputLabelProps, ...rests } = props

  return (
    <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rests} />
  )
}

export default CustomTextField
