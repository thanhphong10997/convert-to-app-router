'use client'

// React
import * as React from 'react'

// Mui
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { Badge, Divider, styled } from '@mui/material'

// Hooks
import { useAuth } from 'src/hooks/useAuth'

// Image
import Image from 'next/image'

// Iconify
import { Icon } from '@iconify/react/dist/iconify.js'

// Translate
import { useTranslation } from 'react-i18next'

// router
import { useRouter } from 'next/navigation'

// Component
import { ROUTE_CONFIG } from 'src/configs/route'
import { toFullName } from 'src/utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/stores'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

export default function UserDropdown() {
  // translate
  const { t, i18n } = useTranslation()

  // react
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // router
  const router = useRouter()

  // auth
  const { user, logout, setUser } = useAuth()
  const userPermission = user?.role?.permissions || []

  // redux
  const { userData } = useSelector((state: RootState) => state.auth)

  // handle
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleNavigateMyProfile = () => {
    router.push(ROUTE_CONFIG.MY_PROFILE)
    handleClose()
  }

  const handleNavigateChangePassword = () => {
    router.push(ROUTE_CONFIG.CHANGE_PASSWORD)
    handleClose()
  }

  const handleManageSystem = () => {
    router.push(ROUTE_CONFIG.DASHBOARD)
    handleClose()
  }

  const handleNavigateMyProduct = () => {
    router.push(ROUTE_CONFIG.MY_PRODUCT)
    handleClose()
  }

  const handleNavigateMyOrder = () => {
    router.push(ROUTE_CONFIG.MY_ORDER)
    handleClose()
  }

  // get the user data from redux after update auth me
  React.useEffect(() => {
    if (userData) {
      setUser({ ...userData })
    }
  }, [userData])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.avatar ? (
                  <Image
                    width={0}
                    height={0}
                    src={user?.avatar}
                    alt='avatar'
                    style={{ width: '32px', height: 'auto', objectFit: 'cover' }}
                  />
                ) : (
                  <Icon icon='clarity:avatar-line' />
                )}
              </Avatar>
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mx: 2, pb: 2, px: 2 }}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <Image
                  width={0}
                  height={0}
                  src={user?.avatar}
                  alt='avatar'
                  style={{ width: '32px', height: 'auto', objectFit: 'cover' }}
                />
              ) : (
                <Icon icon='clarity:avatar-line' />
              )}
            </Avatar>
          </StyledBadge>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component='span'>
              {toFullName(user?.lastName || '', user?.middleName || '', user?.firstName || '', i18n.language) ||
                user?.email}
            </Typography>
            <Typography component='span'>{user?.role?.name}</Typography>
          </Box>
        </Box>
        <Divider />
        {userPermission?.length > 0 && (
          <MenuItem onClick={handleManageSystem}>
            <Avatar>
              <Icon icon='carbon:manage-protection' />
            </Avatar>
            {t('manage_system')}
          </MenuItem>
        )}
        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar>
            <Icon icon='clarity:avatar-line' />
          </Avatar>
          {t('my_profile')}
        </MenuItem>
        <MenuItem onClick={handleNavigateMyProduct}>
          <Avatar>
            <Icon icon='fa-brands:product-hunt' />
          </Avatar>
          {t('my_product')}
        </MenuItem>
        <MenuItem onClick={handleNavigateMyOrder}>
          <Avatar>
            <Icon icon='material-symbols-light:order-approve-rounded' />
          </Avatar>
          {t('my_order')}
        </MenuItem>
        <MenuItem onClick={handleNavigateChangePassword}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <Icon icon='mdi:password-outline' />
          </Avatar>
          {t('change_password')}
        </MenuItem>
        <MenuItem onClick={logout}>
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <Icon icon='ic:baseline-logout' />
          </Avatar>
          {t('log_out')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
