"use server"

import { redirect } from "next/navigation"
import { mockLogin, destroySession } from "@/lib/auth"
import { revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/lib/cache"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  const user = await mockLogin(email)

  if (!user) {
    return { error: "User not found. Try: john@example.com, jane@example.com, or bob@example.com" }
  }

  revalidateTag(CACHE_TAGS.USER_SESSION)
  revalidateTag(CACHE_TAGS.USER_PROJECTS)

  const redirectTo = new URL("/app/projects", process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000")
  redirect(redirectTo.toString())
}

export async function logoutAction() {
  await destroySession()

  revalidateTag(CACHE_TAGS.USER_SESSION)
  revalidateTag(CACHE_TAGS.USER_PROJECTS)

  redirect("/login")
}
