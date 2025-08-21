import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const session = await getSession()
  const params = await searchParams

  // If already logged in, redirect to app
  if (session) {
    redirect(params.redirect || "/app/projects")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-2">Enter your email to access your projects</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-muted-foreground">
          <p>Demo accounts:</p>
          <p>john@example.com • jane@example.com • bob@example.com</p>
        </div>
      </div>
    </div>
  )
}
