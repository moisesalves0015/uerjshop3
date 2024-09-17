"use client"

import { SessionProvider } from "next-auth/react"

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
      {children}
    </SessionProvider>
  )
}

export default Provider