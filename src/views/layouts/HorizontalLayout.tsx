'use client'

// React
import * as React from 'react'

// Mui
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'

// Next
import { NextPage } from 'next'
import { Icon } from '@iconify/react/dist/iconify.js'
import UserDropdown from 'src/views/components/user-dropdown'
import ModeToggle from '../components/mode-toggle'
import LanguageDropdown from '../components/language-dropdown'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'
import Link from 'next/link'
import CartProduct from '../components/cart-product'
import NotificationDropDown from '../components/notification-dropdown'
import { createUrlQuery } from 'src/utils'
import i18nConfig from 'src/app/i18nConfig'
import { useTranslation } from 'react-i18next'

// Iconify
// import { Icon } from '@iconify/react'

type TProps = {
  open: boolean
  toggleDrawer: () => void
  hideMenu?: boolean
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, hideMenu }) => {
  // hooks
  const auth = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const pathName = usePathname()
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const defaultUrl = currentLang === i18nConfig.defaultLocale ? '/' : `/${currentLang}`

  // handle
  const handleNavigateLogIn = () => {
    if (pathName !== defaultUrl) {
      router.replace(`${ROUTE_CONFIG.LOGIN}?${createUrlQuery('returnUrl', pathName)}`)
    } else {
      router.replace(ROUTE_CONFIG.LOGIN)
    }
  }

  return (
    <AppBar position='absolute' open={open} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          margin: '0 20px'
        }}
      >
        {!hideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <Icon icon='mingcute:menu-line' />
          </IconButton>
        )}
        <Typography component='h1' variant='h6' color='primary' noWrap sx={{ flexGrow: 1 }}>
          <Link href={ROUTE_CONFIG.HOME} style={{ color: 'inherit' }}>
            HOME
          </Link>
        </Typography>
        <LanguageDropdown />
        <ModeToggle />
        <CartProduct />
        {auth.user ? (
          <>
            <NotificationDropDown />
            <UserDropdown />
          </>
        ) : (
          <Button variant='contained' sx={{ width: 'auto', ml: 4 }} onClick={handleNavigateLogIn}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default HorizontalLayout
