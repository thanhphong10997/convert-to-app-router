'use client'

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig, { LIST_PAGE_PUBLIC } from 'src/configs/auth'

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  LoginGoogleParams,
  LoginFacebookParams
} from './types'
import { loginAuth, loginAuthFacebook, loginAuthGoogle, logoutAuth } from 'src/services/auth'
import { API_ENDPOINT } from 'src/configs/api'
import {
  clearLocalRememberLoginAuthSocial,
  clearLocalUserData,
  setLocalUserData,
  setTemporaryToken
} from 'src/helpers/storage'
import instanceAxios from 'src/helpers/axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { AppDispatch, RootState } from 'src/stores'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductToCart } from 'src/stores/order-product'
import { ROUTE_CONFIG } from 'src/configs/route'
import { signOut } from 'next-auth/react'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginGoogle: () => Promise.resolve(),
  loginFacebook: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  // redux
  const dispatch: AppDispatch = useDispatch()

  // translate
  const { t } = useTranslation()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await instanceAxios

          // .get(authConfig.meEndpoint, {
          .get(API_ENDPOINT.AUTH.AUTH_ME)
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            clearLocalUserData()
            setUser(null)
            setLoading(false)
            if (!pathName.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    // axios
    //   .post(authConfig.loginEndpoint, params)
    loginAuth({ email: params.email, password: params.password, deviceToken: params?.deviceToken })
      .then(async response => {
        if (params.rememberMe) {
          setLocalUserData(JSON.stringify(response.data.user), response.data.access_token, response.data.refresh_token)
        } else {
          setTemporaryToken(response?.data?.access_token)
        }

        // get the returnUrl key from the search parameters
        const returnUrl = searchParams.get('returnUrl')

        setUser({ ...response.data.user })
        toast.success(t('login_success'))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  // Login google
  const handleLoginGoogle = (params: LoginGoogleParams, errorCallback?: ErrCallbackType) => {
    // axios
    //   .post(authConfig.loginEndpoint, params)
    loginAuthGoogle({ idToken: params?.tokenId, deviceToken: params.deviceToken })
      .then(async response => {
        if (params.rememberMe) {
          setLocalUserData(JSON.stringify(response.data.user), response.data.access_token, response.data.refresh_token)
        } else {
          setTemporaryToken(response?.data?.access_token)
        }

        // get the returnUrl key from the search parameters
        const returnUrl = searchParams.get('returnUrl')

        setUser({ ...response.data.user })
        toast.success(t('login_success'))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  // Login facebook
  const handleLoginFacebook = (params: LoginFacebookParams, errorCallback?: ErrCallbackType) => {
    // axios
    //   .post(authConfig.loginEndpoint, params)
    loginAuthFacebook({ idToken: params?.tokenId, deviceToken: params.deviceToken })
      .then(async response => {
        if (params.rememberMe) {
          setLocalUserData(JSON.stringify(response.data.user), response.data.access_token, response.data.refresh_token)
        } else {
          setTemporaryToken(response?.data?.access_token)
        }
        // get the returnUrl key from the search parameters
        const returnUrl = searchParams.get('returnUrl')

        setUser({ ...response.data.user })
        toast.success(t('login_success'))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setLoading(true)
    logoutAuth().then(res => {
      setUser(null)
      clearLocalUserData()
      clearLocalRememberLoginAuthSocial()

      // sign out google account
      // signOut()

      // check if the page is not public then redirect to the login page
      if (!LIST_PAGE_PUBLIC?.some(item => pathName?.startsWith(item))) {
        if (pathName !== '/') {
          router.replace(ROUTE_CONFIG.LOGIN)
        } else {
          router.replace(ROUTE_CONFIG.LOGIN)
        }
      }

      // reset the items in the cart when the user is logged out
      dispatch(updateProductToCart({ orderItems: [] }))
      setLoading(false)

      // router.push('/login')
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    loginGoogle: handleLoginGoogle,
    loginFacebook: handleLoginFacebook
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
