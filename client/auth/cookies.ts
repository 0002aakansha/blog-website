import Cookies from 'js-cookie'

export const setCookies = (token: string) => Cookies.set('token', token, { expires: 7, path: '/' })

export const getCookie = () => Cookies.get('token')

export const removeCookie = () => Cookies.remove('token')