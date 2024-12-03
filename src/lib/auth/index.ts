import auth0 from 'auth0-js'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
      clientID: import.meta.env.PUBLIC_AUTH0_CLIENTID,
      redirectUri: import.meta.env.PUBLIC_AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  const expiresAt = +(sessionStorage.getItem('expires_at') ?? '0')
  return expiresAt && new Date().getTime() < expiresAt
}

export const login = () => {
  if (!isBrowser) {
    return
  }
  auth.authorize()
}

export const logout = () => {
  if (!isBrowser) {
    return
  }

  sessionStorage.removeItem('expires_at')
  auth.logout({
    returnTo: import.meta.env.PUBLIC_DOMAIN,
    clientID: import.meta.env.PUBLIC_AUTH0_CLIENTID,
  })
}

const setSession =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (cb = () => {}) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: any, authResult: any) => {
      if (err) {
        window.history.replaceState({}, document.title, '/')
        cb()
      } else if (authResult) {
        const expiresAt = 60 * 1000 + new Date().getTime()
        sessionStorage.setItem('expires_at', JSON.stringify(expiresAt))
        window.history.replaceState({}, document.title, '/intern')
        cb()
      }
    }

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  auth.parseHash(setSession())
}
