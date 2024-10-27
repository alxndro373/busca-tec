import NextAuth from "next-auth"
import { authConfig } from "./auth"
import { NextResponse } from "next/server"

const {auth: middleware} = NextAuth(authConfig)

const privateRoutes = ["/ad", "/ad/lostObjects", "foundObjects"]

export default middleware((req) => {
    const {nextUrl, auth} = req
    const isLogged = !!auth?.user
    if(privateRoutes.includes(nextUrl.pathname) && !isLogged) return NextResponse.redirect(new URL("/login", nextUrl))

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}