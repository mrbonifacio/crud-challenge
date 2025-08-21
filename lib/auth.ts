import { cookies } from "next/headers"
import { prisma } from "./prisma"

const SESSION_COOKIE_NAME = "session"

export interface User {
  id: string
  email: string
  name: string | null
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie?.value) {
    return null
  }

  try {
    // In a real app, you'd verify a JWT or session token
    // For this mock, we'll just use the user ID directly
    const userId = sessionCookie.value

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    })

    return user
  } catch (error) {
    console.error("Session validation error:", error)
    return null
  }
}

export async function createSession(userId: string) {
  const cookieStore = await cookies()

  // In a real app, you'd create a proper session token/JWT
  // For this mock, we'll just store the user ID
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function mockLogin(email: string): Promise<User | null> {
  // Mock authentication - find user by email
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true },
  })

  if (user) {
    await createSession(user.id)
    return user
  }

  return null
}
