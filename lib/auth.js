import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      // "Access-Control-Allow-Credentials": true
      // "Access-Control-Allow-Origin":  "http://localhost:3000"
    }
  }

  function createApolloClient() {
    const link = new HttpLink({
      // uri: 'http://localhost:1337/graphql'
      uri: 'https://m2.solisys.com.br/graphql',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":  "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization",
        "Access-Control-Allow-Credentials": true
      },
      // headers: getAuthHeaders(),
      // fetchOptions: {
      //   mode: 'no-cors'
      // }
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  const signOut = () => {
    setAuthToken(null)
  }

  const signIn = async ({ email, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
      mutation LoginMutation($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
          token
        }
      }
    `
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { email, password },
    })

    console.log("result bearer", result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
    }
  }

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
  }
}
