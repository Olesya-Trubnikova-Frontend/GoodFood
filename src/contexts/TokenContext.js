import { useContext, useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import {createContext, useMemo} from 'react'

export const TokenContext = createContext()

function TokenContextProvider ({ children }) {
  const [userToken, setUserToken] = useState (() => {
		const tokenLs = localStorage.getItem("user_token")
		return tokenLs
	})
useEffect(() => {
	localStorage.setItem("user_token", userToken)
}, [userToken])

const setNewToken = useCallback((Token) => setUserToken(Token), [setUserToken])

const removeToken = useCallback(() => setUserToken(""), [setUserToken])

const tokenValues = useMemo(() => ({userToken, setNewToken, removeToken}), [userToken])

  return (
    <TokenContext.Provider value={tokenValues}>
        {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider;
export const useTokenContext = () => useContext(TokenContext);


