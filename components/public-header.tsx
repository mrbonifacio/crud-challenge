import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth"
import Link from "next/link"

export async function PublicHeader() {
  const session = await getSession()

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/projects" className="text-xl font-semibold text-card-foreground hover:text-accent">
              Project Gallery
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <Button asChild>
                <Link href="/app/projects">My Projects</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
